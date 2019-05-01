import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import LoginSignup from "../loginSignup/LoginSignup";
import { Toolbar, Typography } from "@material-ui/core";
import "./Header.css";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actionTypes";
import UserMenu from "../loginSignup/UserMenu";
import { withCookies } from "react-cookie";

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    isDialogOpened: state.dialog.isDialogOpened
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: () => dispatch({ type: actionTypes.CLOSE_DIALOG }),
    openDialog: () => dispatch({ type: actionTypes.OPEN_DIALOG }),
    userLogin: token => dispatch({ type: actionTypes.USER_LOGIN, val: token })
  };
};

class Header extends Component {
  componentWillMount() {
    console.log("header will: ", this.props.token,this.props.isDialogOpened);
  }
  componentDidMount() {
    console.log("header did mount ", this.props.token);
  }

  componentDidUpdate() {
    console.log("header did update ", this.props.token);
  }

  componentWillUpdate() {
    console.log("header will update ", this.props.token);
  }

  render() {
    console.log("header render: ", this.props.token);
    return (
      <AppBar className="flex-container">
        <Toolbar>
          <Typography color="inherit" variant="h6" style={{ flex: 1 }}>
            N R
          </Typography>

          {this.props.token !== undefined ? (
            <UserMenu />
          ) : (
            <Button
              size="small"
              color="inherit"
              disableFocusRipple={true}
              disableRipple={true}
              disableTouchRipple={true}
              onClick={this.props.openDialog}
            >
              Login & Signup
            </Button>
          )}
          <LoginSignup
            open={this.props.isDialogOpened}
            onClose={this.props.closeDialog}
          />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withCookies(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
