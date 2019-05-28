import React, { Component } from "react";
import "./App.css";
import Header from "./components/mainPage/Header";
import Routes from "./components/routes/Routes";
import { withCookies } from "react-cookie";
import { getCookie ,setCookie} from "./cookies/cookie";
import { connect } from "react-redux";
import * as actionTypes from "./store/actionTypes";

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
    setCookie(this.props.cookies,6);
    //this.props.cookies.remove("NR_Token",{path:'/'});
    var token = getCookie(this.props.cookies);
    if (token !== undefined) {
      this.props.userLogin(token);
    }
    // console.log("App will mount ", this.props.token,this.props.isDialogOpened);
    // this.props.userLogin(15);
  }

  render() {
    return (
      <div className="App">
         <Header />
        <h2>Natural Remedy</h2> 
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
