import React, { useState, useContext, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { SignupHandleSubmit } from './Controllers/SignupController';
import { MessageContext, SuccessMessageContext } from '../App';
import { isNotLoggedIn } from '../helpers/helpers';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {dispatch} = useContext(MessageContext);
    const { successDispatch } = useContext(SuccessMessageContext);
    // console.log("MESSAGE - ", message);
    // console.log("SUCCESS MESSAGE - ", successMessage);
    const navigate = useNavigate();
    useEffect(() => {
        isNotLoggedIn(navigate);
    }, []);
    return (
        <div>
            
            <h2>Signup</h2>
            <Form onSubmit={(e) => SignupHandleSubmit(e, name, email, password, setName, setEmail, setPassword, dispatch, successDispatch)}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Button variant="primary" type="submit">Submit</Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Signup;