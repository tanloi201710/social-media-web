import React, { useEffect, useRef, useState } from 'react';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';

import ChangeInfo from './pages/changeInfo/ChangeInfo';
import Covid19 from './pages/covid-19/Covid19';
import Profile from './pages/profile/Profile';
import Chat from './pages/chat/Chat';
import { SET_SOCKET } from './constants/actionTypes';



function App() {
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const {authData} = useSelector((state) => state.auth);
  const { savedSocket } = useSelector((state) => state.socket);
  const socket = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(authData);
  },[authData]);

  useEffect(() => {
    if(user && savedSocket === null) {
      socket.current = io("ws://localhost:8080");
      dispatch({ type: SET_SOCKET, payload: socket });
    }
  }, [user, dispatch, savedSocket]);

  
  // const user = JSON.parse(localStorage.getItem('profile'));

  return ( 
    <Router>
      <Switch >
        <Route exact path='/' component={() => (!user ? <Redirect to="/login"/> : <Home user={user} socket={socket.current} />)}/>
          
        <Route  path='/login'>
          {user ? <Redirect to='/' /> : <Login/>}
        </Route>

        <Route path="/register">
          <Register/>
        </Route>

        <Route path="/chat">
          <Chat/>
        </Route>

        <Route path="/profile/:id">
          <Profile/>
        </Route>

        <Route  path='/changeInfo'>
          <ChangeInfo/>
        </Route>

        <Route path="/Covid-19">
          <Covid19 />
        </Route>


      </Switch>
    </Router>
  );
}

export default App;
