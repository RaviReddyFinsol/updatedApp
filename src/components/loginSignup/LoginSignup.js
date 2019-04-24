import React, { Component } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Dialog from "@material-ui/core/Dialog";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actionTypes";
import "./LoginSignup.css";

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: () => dispatch({ type: actionTypes.CLOSE_DIALOG })
  };
};

const mapStateToProps = state => {
  return {
    isDialogOpened: state.dialog.isDialogOpened
  };
};

class loginSignup extends Component {
  constructor() {
    super();
    this.state = {
      isLoginPageSelected: true
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  loginSelected = () => {
    this.setState({ isLoginPageSelected: true });
  };

  signupSelected = () => {
    this.setState({ isLoginPageSelected: false });
  };

  render() {
    return (
      <Dialog
        onClose={this.props.closeDialog}
        open={this.props.isDialogOpened}
        fullWidth={true}
      >
        <Button
          onClick={this.props.closeDialog}
          size="small"
          disableRipple={true}
        >
          X
        </Button>
        <div>
          {this.state.isLoginPageSelected ? (
            <Login openSignup={this.signupSelected} />
          ) : (
            <Signup openLogin={this.loginSelected} />
          )}
        </div>
      </Dialog>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(loginSignup);
