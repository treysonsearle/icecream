import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from './Components/Login';
import Dash from './Components/Dash';
import Customize from './Components/Customize';
import Order from './Components/Order'

export default (
    <Switch>
        <Route component={Login} exact path='/'/>
        <Route component={Dash}  path='/dash'/>
        <Route component={Customize}  path='/customize'/>
        <Route component={Order}  path='/Order/:id'/>
    
    </Switch>
  );