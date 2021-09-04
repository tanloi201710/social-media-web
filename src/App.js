import React from 'react';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import ChangeInfo from './pages/changeInfo/ChangeInfo';
import Covid19 from './pages/covid-19/Covid19';
import Profile from './pages/profile/Profile';



function App() {
  const user = JSON.parse(localStorage.getItem('profile'));

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
