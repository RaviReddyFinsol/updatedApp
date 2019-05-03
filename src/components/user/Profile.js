import React, { Component } from "react";
import {Redirect} from "react-router-dom";
//import UpdatePassword from './UpdatePassword';
//import Test from './Test';

var istokenValid = true;

export default class Profile extends Component {

 componentDidMount(){   
   istokenValid = false;
    console.log("profile ",this.props.match.params.token);
 }

 render() {    
    return (
     istokenValid === true ? <Redirect to={{pathname:"/"}}/> : (
      <div>
        <h1>Hello user</h1>
      </div>)
    );
  }
}
