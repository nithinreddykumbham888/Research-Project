import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {Button, Row, Col} from 'react-bootstrap';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import 'react-tabs/style/react-tabs.css';

import "./Dashboard.css";
import "./table.css";

import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Search from "./search"
import Upload from "./upload"

function Dashboard() {

    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
    }, [user, loading]);

    return (
        <div className="dashboard">
            <div className="dashboard__container">
                <Row className="Homebar">
                    <Col>
                    <h3>Research Content Management</h3>
                    </Col>
                    <Col xs={1}><h4>{name}</h4></Col>
                    <Col xs={2}><h4>{user?.email}</h4></Col>
                    <Col xs={1}>
                        <Button className="dashboard__btn" onClick={logout}>
                            Logout
                        </Button>
                    </Col>
                </Row>
                <Tabs className="Tabs">
                    <TabList>
                        <Tab>Upload</Tab>
                        <Tab>Search</Tab>
                    </TabList>
                    <TabPanel>
                        <Upload />
                    </TabPanel>
                    <TabPanel>
                        <Search />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
}

export default Dashboard;