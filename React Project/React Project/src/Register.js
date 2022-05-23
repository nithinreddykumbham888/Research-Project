import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
} from "./firebase";
import { Form, Button } from 'react-bootstrap';
import "./Register.css";


function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const history = useNavigate();
    const register = () => {
        if (!name) alert("Please enter name");
        registerWithEmailAndPassword(name, email, password);
    };
    useEffect(() => {
        if (loading) return;
        if (user) history("/dashboard");
    }, [user, loading]);
    return (
        <div className="register">
            <div className="register__container">
                <h3 className="Header">Research Content Management</h3>
                <Form className="form">
                    
                    <Form.Group className="mb-3" controlId="formPaper">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            className="register__textBox"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name"
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formPaper">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            className="register__textBox"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail Address"
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formPaper">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            className="register__textBox"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPaper">
                    <Button className="register__btn" onClick={register}>
                        Register
                    </Button>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPaper">
                    <Button
                        className="register__btn register__google"
                        onClick={signInWithGoogle}
                    >
                        Register with Google
                    </Button>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPaper">
                    <div>
                        Already have an account? <Link to="/">Login</Link> now.
                    </div>
                    </Form.Group>

                </Form>
            </div>
        </div>
    );
}
export default Register;
