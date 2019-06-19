import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import LoginSignup from "../loginSignup/LoginSignup";
import { Toolbar, Typography, Hidden } from "@material-ui/core";
import "./Header.css";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actionTypes";
import UserMenu from "../loginSignup/UserMenu";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
//import { withCookies } from "react-cookie";
import MenuIcon from '@material-ui/icons/Menu';
//import withWidth from '@material-ui/core/withWidth';

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

  render() {
    return (
      <AppBar className="flex-container">
        <Toolbar>
          <Hidden smUp>
            <MenuIcon />
          </Hidden>
          <Hidden xsDown>
            <Typography variant="body2" color="secondary" component="h3">
              N R
          </Typography>
          </Hidden> 
          {" "}<SearchIcon />
          <InputBase
            placeholder="Search…"
          />
          <Hidden xsDown>
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
          </Hidden>
        <LoginSignup
          open={this.props.isDialogOpened}
          onClose={this.props.closeDialog}
        />
        </Toolbar>
      </AppBar >
    );
  }
}

export default
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header);
