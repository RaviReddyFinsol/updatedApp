import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Employ from './Employ';
import User from './User';
import Default from './Default';
import ProtectedRoute from './ProtectedRoute';

export default function Main() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Default}/>
        <ProtectedRoute path='/emp' component={Employ}/>
        <ProtectedRoute path='/user' component={User}/>
      </Switch>
      </div>
  );
}