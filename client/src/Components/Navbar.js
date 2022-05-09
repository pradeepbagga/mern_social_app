import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import { getUserLS } from '../helpers/helpers';

const Header = () => {
   

    const { userState, userDispatch } = useContext(UserContext);
    const renderList = () => {
        if (userState) {
            return [
                <Nav.Link as={Link} to="/" key="1">Home</Nav.Link>,
                <Nav.Link as={Link} to="/createpost" key="2">Create Post</Nav.Link>,
                <Nav.Link as={Link} to="/profile" key="3">Profile</Nav.Link>,
                <Nav.Link as={Link} to="/logout" key="4">Logout</Nav.Link>
            ]
        }
        else {
            return [
                <Nav.Link as={Link} to="/signup" key="1">Signup</Nav.Link>,
                <Nav.Link as={Link} to="/signin" key="2">Signin</Nav.Link>
            ]
        }
    }
    
    return (
        <>
            <Navbar bg="light" >
                <Navbar.Brand as={Link} to="/">React APP</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="justify-content-end">
                        {renderList()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Header;