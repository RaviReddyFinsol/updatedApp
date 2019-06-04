import React, { Component } from "react";
import "./App.css";
import Header from "./components/mainPage/Header";
import Routes from "./components/routes/Routes";
import { withCookies } from "react-cookie";
import { getCookie, setCookie } from "./cookies/cookie";
import { connect } from "react-redux";
import * as actionTypes from "./store/actionTypes";
import CatogeryMenu from "./components/catogery/CatogeryMenu";

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};
const mapDispatchToProps = dispatch => {
  return {
    closeDialog: () => dispatch({ type: actionTypes.CLOSE_DIALOG }),
    openDialog: () => dispatch({ type: actionTypes.OPEN_DIALOG }),
    userLogin: token => dispatch({ type: actionTypes.USER_LOGIN, val: token })
  };
};

class App extends Component {
  componentWillMount() {
    //setCookie(this.props.cookies, 10);
    var token = getCookie(this.props.cookies);
    if (token !== undefined) {
      this.props.userLogin(token);
      setCookie(this.props.cookies, token);
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <h3>Natural Remedy</h3>
        <CatogeryMenu />
        <Routes />
      </div>
    );
  }
}

export default withCookies(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
