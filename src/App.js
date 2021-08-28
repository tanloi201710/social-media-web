import React, { useEffect } from 'react';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import ChangeInfo from './pages/changeInfo/ChangeInfo';



function App() {
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    // window.location.reload();
  },[user]);

  return ( 
    <Router>
      <Switch >
        <Route exact path='/' component={() => (!user ? <Redirect to="/login"/> : <Home user={user}/>)}/>
          
        <Route  path='/login'>
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/profile/:id">
          <Profile user={user}/>
        </Route>

        <Route  path='/changeInfo'>
          <ChangeInfo/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
