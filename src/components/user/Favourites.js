import React, { Component } from "react";
import {Redirect} from "react-router-dom";

var istokenValid = true;

export default class Favourites extends Component {
  render() {
    return ( istokenValid === true ? <Redirect to={{pathname:"/"}}/> : (
      <div>
        <h1>Favourites</h1>
      </div>)
    );
  }
}
