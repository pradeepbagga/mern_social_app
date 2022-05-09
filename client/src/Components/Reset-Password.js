import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ResetPasswordHandleSubmit } from './Controllers/ResetPassword-Controller';
import { MessageContext, SuccessMessageContext } from '../App';

const ResetPassword = ()=>{
    const [email, setEmail] = useState("");
    const { dispatch } = useContext(MessageContext);
    const { successDispatch } = useContext(SuccessMessageContext);
    return(
        <Form onSubmit={(e)=>ResetPasswordHandleSubmit(e, email, setEmail, dispatch, successDispatch)}>
            <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Button variant="primary" type="submit">Reset Password</Button>
                </Form.Group>
        </Form>
    )
}

export default ResetPassword;