import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ActivateHandle } from './Controllers/Account-Activate-Controller';
import { MessageContext, SuccessMessageContext } from '../App';

function AccountActivate() {
    const { token } = useParams();
    // console.log("TOKEN - ", token)
    const { dispatch } = useContext(MessageContext);
    const { successMessage, successDispatch } = useContext(SuccessMessageContext);
    const navigate = useNavigate();
    useEffect(()=>{
        if(successMessage) {
            navigate("/signin");
        }
    },[successMessage]);

    return (
        <>
            <h2>Account Activate</h2>
            <p>Please click to Activate your Account.</p>
            <Button variant="primary" onClick={() => ActivateHandle(token,dispatch, successDispatch)}>Account Activate</Button>
        </>
    )
}

export default AccountActivate;