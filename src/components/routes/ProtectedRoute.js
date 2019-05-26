import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ component: Component, token, ...rest }) => {
  //console.log("protected : ", token);
  return (
    <Route
      {...rest}
      render={props =>
        token !== undefined ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
