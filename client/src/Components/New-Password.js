import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { NewPasswordHandleSubmit } from './Controllers/ResetPassword-Controller';
import { MessageContext, SuccessMessageContext } from '../App';
import { useParams, useNavigate } from 'react-router-dom';

const NewPassword = ()=>{
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const { dispatch } = useContext(MessageContext);
    const { successDispatch } = useContext(SuccessMessageContext);
    const { token } = useParams();
    const navigate = useNavigate();
    console.log("TOKEN - ", token)
    return(
        <Form onSubmit={(e)=>NewPasswordHandleSubmit(e, password, password2, dispatch, successDispatch, token, navigate)}>
            <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
            <Form.Group className="mb-3">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm New Password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Button variant="primary" type="submit">Change Password</Button>
                </Form.Group>
        </Form>
    )
}

export default NewPassword;