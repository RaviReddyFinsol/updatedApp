import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class Profile extends Component {

 componentDidMount(){
    console.log("profile ",this.props.match.params.token);
    // <Redirect to={{pathname:'/'}} />
 }

 render() {    
    return (
      <div>
        <h1>Profile</h1>
      </div>
    );
  }
}
