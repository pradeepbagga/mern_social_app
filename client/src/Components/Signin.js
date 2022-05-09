import React, { useState, useContext, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { SigninHandleSubmit, responseGoogleHandle, responseFacebookHandle } from './Controllers/SigninController';
import { MessageContext, SuccessMessageContext } from '../App';
import { setTokenLS, setUserLS } from '../helpers/helpers';
import { UserContext } from '../App';
import { useNavigate, Link } from 'react-router-dom';
import { isNotLoggedIn } from '../helpers/helpers';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
// GOOGLE
// CLIENT ID - // 836746668768-snqg2lsinuvciap7dcds53et6cofouf3.apps.googleusercontent.com
// CLIENT SECRET - // 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

// FACEBOOK CLIENT SECRET - e44dd03eb4d9737463f0cb2e35e4803a
// FACEBOOK CLIENT ID - 966217950999085

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { dispatch } = useContext(MessageContext);
    const { successDispatch } = useContext(SuccessMessageContext);
    const { userDispatch } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        isNotLoggedIn(navigate);
    }, []);

    const responseGoogle = (response) => {
        // console.log("Google response - ", response)
        responseGoogleHandle(response, dispatch, navigate, setTokenLS, setUserLS, userDispatch, successDispatch);
    }

    const responseFacebook = (response) => {
        responseFacebookHandle(response, dispatch, navigate, setTokenLS, setUserLS, userDispatch, successDispatch);
    }

    return (
        <div>

            <h2>Signin</h2>
            <Form onSubmit={(e) => SigninHandleSubmit(e, email, password, setEmail, setPassword, dispatch, successDispatch, setTokenLS, setUserLS, userDispatch, navigate)}>
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
                    <Button variant="primary" type="submit">Login</Button>
                </Form.Group>
            </Form>
            <p className='text-center'>
                <GoogleLogin
                    clientId="836746668768-snqg2lsinuvciap7dcds53et6cofouf3.apps.googleusercontent.com"
                    buttonText="Signin with Google"
                    autoLoad={false}
                    render={renderProps => (
                        <button className='btn btn-primary btn-google-login' onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="fab fa-google"></i><span>Sign in with Google</span></button>
                    )}
                    scope="profile email"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </p>
            <p className='text-center'>
                <FacebookLogin
                    appId="966217950999085"
                    autoLoad={false}
                    fields="name,email,picture,gender"
                    callback={responseFacebook}
                    cssClass="btn btn-primary btn-google-login btn-facebook"
                    icon="fa-facebook"
                    render={renderProps => (
                        <button onClick={renderProps.onClick}><span>Sign in with Facebook</span></button>
                    )}
                />
            </p>
            <hr />
            <p className="text-center"><strong><Link to="/reset-password">Reset Password</Link></strong></p>
        </div>
    )
}

export default Signin;