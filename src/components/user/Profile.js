import React, { Component } from "react";
import axios from "axios";
import { Route, Redirect } from "react-router-dom";

export default class Profile extends Component {

  componentWillMount(){
    console.log("profile ",this.props.match.params.token);
  }

  render() {
    return (
      <div>
        <h1>Profile</h1>
      </div>
    );
  }
}
