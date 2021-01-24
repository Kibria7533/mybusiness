import React, { Component } from 'react';
import {Switch,Route, BrowserRouter,Router} from 'react-router-dom'
import history from './history';

import Adminlogin from './Component/User/Adminlogin';
import User from './Component/User/User';
import Userregister from './Component/User/Userregister';
import Admin from './Component/Admin/Admin';


class App extends Component {
  render() {
    return (
      <Router history={history}>
     
        <Switch>
        <Route  path='/admin' component={Adminlogin} /> 
          <Route  path='/admindashboard' component={Admin} /> 
          <Route path='/' component={User} />
         
          
      </Switch>
     
      
      </Router>
  );
  }
}

export default App;