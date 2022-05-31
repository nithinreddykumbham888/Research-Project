import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Dashboard.css";
import { auth, getUserData } from "./firebase";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import ViewPdf from "./pdf";
import CommentBox from "./Comment"
import { Button, Row, Col, Form, InputGroup } from 'react-bootstrap';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Container from 'react-bootstrap/Container';

function Search() {

    const [count, setCount] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const [show, setShow] = useState(null);
    const [url, setUrl] = useState("");
    const [type, setType] = useState("Title");
    const [tempTerm, setTempTerm] = useState("");
    const [term, setTerm] = useState("");

    useEffect(() => {
        if (loading)
            return;
        if (tableData.length == 0) {
            getUserData(user?.uid).then(
                (data) => {
                    setTableData(data);
                }
            )
        }
    });

    const ShowPdf = (url) => {
        setUrl(url);
        setShow(1);
    };

    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
            const sorted = [...tableData].sort((a, b) => {
                if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;
                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === "asc" ? 1 : -1)
                );
            });
            setTableData(sorted);
        }
    };

    const columns = [
        { label: "Title", accessor: "Title", sortable: true },
        { label: "Year", accessor: "Year", sortable: true },
        { label: "Topic", accessor: "Topic", sortable: true },
        { label: "Technique", accessor: "Technique", sortable: true },
        { label: "Pdf", accessor: "Pdf", sortable: false },
    ];

    return (
        <>
            <Form>
                <Row>
                    <Col>
                        <InputGroup>
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                id="inlineFormCustomSelect"
                                custom
                                onChange={(e)=>setType(e.target.value)}
                            >
                                <option value="Title">Title</option>
                                <option value="Year">Year</option>
                                <option value="Topic">Topic</option>
                                <option value="Technique">Technique</option>
                            </Form.Control>
                        </InputGroup>
                    </Col>
                    <Col xs={5}>
                        <Form.Control placeholder="Search" onChange={(e)=>setTempTerm(e.target.value)}/>
                    </Col>
                    <Col>
                        <button type="button" className="btn btn-warning" onClick={()=>setTerm(tempTerm)}>
                            <svg width="15px" height="15px">
                                <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
                            </svg>
                        </button>
                    </Col>
                </Row>
            </Form>
            <table className="table">
                <TableHead {...{ columns, handleSorting }} />
                <TableBody columns={columns} tableData={tableData} searchType={type} searchTerm={term} showPdf={ShowPdf} />
            </table>
            {
                show &&
                <Row>
                    <Col xs={9}>
                        <ViewPdf fileURl={url} />
                    </Col>
                    <Col>
                        <CommentBox url={url} />
                    </Col>
                </Row>
            }
        </>
    );
}

export default Search;