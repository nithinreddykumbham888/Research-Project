import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "./firebase";
import { Form, Button } from 'react-bootstrap';
import "./Reset.css";


function Reset() {
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/dashboard");
    }, [user, loading]);

    return (
        <div className="reset">
            <div className="reset__container">
                <h3 className="Header">Research Content Management</h3>
                <Form className="form">

                    <Form.Group className="mb-3" controlId="formPaper">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            className="reset__textBox"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail Address"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPaper">
                        <Button
                            className="reset__btn"
                            onClick={() => sendPasswordReset(email)}
                        >
                            Send password reset email
                        </Button>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPaper">
                        <div>
                            Don't have an account? <Link to="/register">Register</Link> now.
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );

}
export default Reset;
