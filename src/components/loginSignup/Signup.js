import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actionTypes";
import { withCookies } from "react-cookie";
import { setCookie } from "../../cookies/cookie";

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: () => dispatch({ type: actionTypes.CLOSE_DIALOG }),
    userLogin: token => dispatch({ type: actionTypes.USER_LOGIN, val: token })
  };
};

export class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      signupID: "",
      password: "",
      signupError: "",
      isLoading: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  signUp = () => {
    var userSignupDetails = {
      userName: this.state.userName,
      userID: this.state.signupID,
      password: this.state.password
    };
    axios
      .post("http://localhost:9003/api/user/signup", userSignupDetails)
      .then(val => {
        if (val.data.isSuccess) {
          this.props.closeDialog();
          setCookie(this.props.cookies, val.data.token);
          this.props.userLogin(val.data.token);
        } else {
          this.setState({ signupError: val.message });
        }
        this.props.isLoading = false;
        console.log(val);
      })
      .catch(err => {
        this.setState({ signupError: err });
        this.props.closeDialog();
        this.props.isLoading = false;
      });
  };

  render() {
    return (
      <div>
        <TextField
          autoFocus={true}
          label="User Name"
          value={this.state.userName}
          name="userName"
          required
          onChange={this.handleChange}
          margin="normal"
        />
        <br />
        <TextField
          label="Email/Mobile"
          value={this.state.signupID}
          name="signupID"
          onChange={this.handleChange}
          margin="normal"
          required
        />
        <br />
        <TextField
          label="Password"
          value={this.state.password}
          name="password"
          onChange={this.handleChange}
          margin="normal"
          required
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={this.signUp}
        >
          Signup
        </Button>
        <br />
        <br />
        <Button variant="contained" onClick={this.props.openLogin} fullWidth>
          Existing User?Login
        </Button>
      </div>
    );
  }
}

export default withCookies(
  connect(
    null,
    mapDispatchToProps
  )(Signup)
);
