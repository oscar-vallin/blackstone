import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


//all our components
import Login from './components/auth/Login';
import RegisterUser from './components/auth/RegisterUser';
import Project from './components/Projects/Proyect';
import tokenAuth from './config/tokenAuth';
import PrivateRoute from './components/routes/PrivateRoute';

const token = localStorage.getItem('token');
if(token) tokenAuth(token);



const App = () => {
 
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/create" component={RegisterUser}/>
        <PrivateRoute exact path="/tasks" component={Project}/>
      </Switch>
    </Router>
  )
}
export default App;