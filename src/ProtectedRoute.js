 import React from "react";
 import {Route,Redirect} from "react-router-dom"
import {connect} from "react-redux";

const mapStateToProps = state => {
  return {
    token:state.token
  };
}

 const ProtectedRoute = ({ component: Component,token, ...rest }) => {
   console.log("protected ",token)
   return(
    <Route {...rest} render={(props) => (
       token !== undefined ?        
       <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location }}} />   
   )} />
 )};

 export default connect(mapStateToProps)(ProtectedRoute);