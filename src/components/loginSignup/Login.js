import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import axios from "axios";
import * as actionTypes from "../../store/actionTypes";
import { setCookie } from "../../cookies/cookie";
import { withCookies } from "react-cookie";

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: () => dispatch({ type: actionTypes.CLOSE_DIALOG }),
    userLogin: token => dispatch({ type: actionTypes.USER_LOGIN, val: token })
  };
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginID: "",
      password: "",
      message: ""
    };
  }

  componentDidMount() {}

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  login = () => {
    var userLoginDetails = {
      userID: this.state.loginID,
      password: this.state.password
    };
    axios
      .post("http://localhost:9003/api/user/login", userLoginDetails)
      .then(val => {
        if (val.data.isSuccess) {
          this.props.closeDialog();
          setCookie(this.props.cookies, val.data.token);
          this.props.userLogin(val.data.token);
        } else {
          this.setState({ signupError: val.message });
          this.props.closeDialog();
        }
      })
      .catch(err => {
        this.setState({ signupError: err });
        this.props.closeDialog();
      });
  };

  render() {
    return (
      <div>
        <TextField
          autoFocus={true}
          label="Email/Mobile"
          value={this.state.loginID}
          name="loginID"
          onChange={this.handleChange}
          margin="normal"
        />
        <br />
        <TextField
          label="Password"
          value={this.state.password}
          name="password"
          onChange={this.handleChange}
          margin="normal"
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          value="Login"
          fullWidth
          onClick={this.login}
        >
          Login
        </Button>
        <br />
        <br />
        <Button variant="contained" onClick={this.props.openSignup} fullWidth>
          New User?Signup
        </Button>
      </div>
    );
  }
}

export default withCookies(
  connect(
    null,
    mapDispatchToProps
  )(Login)
);
