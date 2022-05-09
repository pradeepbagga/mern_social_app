import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
// import { UserContext } from '../App';
import { getUserLS } from '../helpers/helpers';

const ProtectedRoute = () => {
    // const { userState } = useContext(UserContext);
    const user = getUserLS();
    // console.log("PROTECTED - ", user);
    return user ? <Outlet /> : < Navigate to="/signin" />;
}

export default ProtectedRoute;
