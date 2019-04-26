import React, { Component } from "react";
//import {Switch,Route,Link} from "react-router-dom";
//import UpdatePassword from './UpdatePassword';
//import Test from './Test';

export default class Profile extends Component {

 componentDidMount(){
    console.log("profile ",this.props.match.params.token);
 }

 render() {    
    return (
      <div>
        <h1>Hello user</h1>
        {/* <Link to={{pathname:`/userProfile/${this.props.match.params.token}/test`}} >test</Link>
        <Switch>
          <Route exact path="/userProfile/:token" component={UpdatePassword}/>
          <Route exact path="/userProfile/:token/test" component={Test}/>
        </Switch> */}
      </div>
    );
  }
}
