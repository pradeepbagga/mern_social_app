import React, { useEffect, useContext } from 'react';
import {LogoutHandle} from './Controllers/LogoutHandle';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

function Logout(){
    const navigate = useNavigate();
    const {userState, userDispatch} = useContext(UserContext);
    useEffect(()=>{
        LogoutHandle(navigate,userDispatch);
    },[]);

    return(
        <div>
            <h2>Logout Page</h2>
        </div>
    )
}

export default Logout;