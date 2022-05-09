import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import CreatePost from './Components/CreatePost';
import Post from './Components/Post';
import Logout from './Components/Logout';
import Header from './Components/Navbar';
import Profile from './Components/Profile';
import ProfileUser from './Components/Profile-UserLoggedin';
import AccountActivate from './Components/Account-Activate';
import { Container, Alert } from 'react-bootstrap';
import { messageIstate, messageReducer, successMessageIstate, successMessageReducer } from './reducers/messageReducer';
import { userIstate, userReducer } from './reducers/userReducer';
import { getUserLS } from './helpers/helpers';
import ProtectedRoute from './Protected/Protected-Route';
import ResetPassword from './Components/Reset-Password';
import NewPassword from './Components/New-Password';

export const MessageContext = createContext();
export const SuccessMessageContext = createContext();
export const UserContext = createContext();

const Routing = () => {
  const { message, dispatch } = useContext(MessageContext);
  const { successMessage, successDispatch } = useContext(SuccessMessageContext);
  const { userState, userDispatch } = useContext(UserContext);
  // console.log("ABCD ERROR - ",message);
  // console.log("SUCCESS MESSAGE - ",successMessage);
  // console.log("GET USER - ",getUserLS());
  // console.log("userState - ",userState);
  useEffect(() => {
    const user = getUserLS();
    if (user) {
      userDispatch({ type: "USER", payload: user });
    }
  }, []);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch({ type: "ERROR", payload: null })
      }, 3000);
    }
  }, [message]);

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        successDispatch({ type: "SUCCESS", payload: null })
      }, 3000);
    }
  }, [successMessage]);

  return (
    <>
      {
        message ? <Alert variant="danger">{message}</Alert>
          : null
      }
      {
        successMessage ? <Alert variant="success">{successMessage}</Alert>
          : null
      }

      <Routes>
        {/* <Route path="/" exact element={<Home />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        {/* <Route path="/createpost" element={<CreatePost />} /> */}
        {/* <Route path="/logout" element={<Logout />} /> */}
        <Route path="/activate-account/:token" element={<AccountActivate />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-password/:token" element={<NewPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" exact element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile/" exact element={<ProfileUser />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

      </Routes>
    </>
  )
}

function App() {
  const [message, dispatch] = useReducer(messageReducer, messageIstate);
  const [successMessage, successDispatch] = useReducer(successMessageReducer, successMessageIstate);
  const [userState, userDispatch] = useReducer(userReducer, userIstate);
  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      <SuccessMessageContext.Provider value={{ successMessage, successDispatch }}>
        <MessageContext.Provider value={{ message, dispatch }}>
          <BrowserRouter>
            <Header />
            <Container>
              <Routing />
            </Container>
          </BrowserRouter>
        </MessageContext.Provider>
      </SuccessMessageContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
