import React, { Component } from "react";
//import axios from "axios";
import { Switch,Route,Redirect } from "react-router-dom";
import UpdatePassword from './UpdatePassword';
import Test from './Test';

export default class Profile extends Component {

 componentDidMount(){
    console.log("profile ",this.props.match.params.token);
    // <Redirect to={{pathname:'/'}} />
 }

 render() {    
    return (
      <div>
        <h1>Hello user</h1>
        <Switch>
          <Route exact path="/userProfile/:token" component={UpdatePassword}/>
          <Route exact path="/userProfile/:token/test" component={Test}/>
        </Switch>
      </div>
    );
  }
}
