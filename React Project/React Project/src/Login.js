import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Form, Button } from 'react-bootstrap';
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/dashboard");
    }, [user, loading]);
    return (
        <div className="login">
            <div className="login__container">
            <h3 className="Header">Research Content Management</h3>
                <Form className="form">
                    <Form.Group className="mb-3" controlId="formPaper">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            className="login__textBox"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail Address"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPaper">
                        <Form.Label>Password    </Form.Label>
                        <Form.Control
                            type="password"
                            className="login__textBox"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPaper">
                    <Button
                        className="login__btn"
                        onClick={() => logInWithEmailAndPassword(email, password)}
                    >
                        Login
                    </Button>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPaper">
                    <Button className="login__btn login__google" onClick={signInWithGoogle}>
                        Login with Google
                    </Button>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPaper">
                    <div>
                        <Link to="/reset">Forgot Password</Link>
                    </div>
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
export default Login;