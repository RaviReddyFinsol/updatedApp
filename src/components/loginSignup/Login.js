import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import axios from "axios";
import * as actionTypes from "../../store/actionTypes";
import { setCookie } from "../../cookies/cookie";
import { withCookies } from "react-cookie";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: () => dispatch({ type: actionTypes.CLOSE_DIALOG }),
    userLogin: token => dispatch({ type: actionTypes.USER_LOGIN, val: token })
  };
};

class Login extends Component {
  isComponentUnmounted = false;
  constructor(props) {
    super(props);
    this.state = {
      loginID: "",
      password: "",
      message: "",
      snackbarState: false,
      snackbarMessage: "",
      isLoading: false
    };
  }

  componentDidMount() { }

  componentWillUnmount() {
    this.isComponentUnmounted = true;
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  login = () => {
    if (this.state.loginID === undefined || this.state.loginID.length === 0) {
      this.setState({
        snackbarMessage: "Invalid Email/Phone number",
        snackbarState: true,
        isLoading: false
      });
      this.snackbarTimeout();
      return;
    }
    if (this.state.password === undefined || this.state.password.length < 5) {
      this.setState({
        snackbarMessage: "Invalid Password",
        snackbarState: true,
        isLoading: false
      });
      this.snackbarTimeout();
      return;
    }
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
          this.setState({ snackbarMessage: val.data.message,snackbarState:true,isLoading:false });
          this.snackbarTimeout();
        }
      })
      .catch(err => {        
        this.setState({
          snackbarMessage: "Unable to connect to server",
          snackbarState: true,
          isLoading: false
        });
        this.snackbarTimeout();
      });
  };

  snackbarTimeout = () => {
    setTimeout(() => {
      if (!this.isComponentUnmounted) {
        this.setState({ snackbarState: false });
      }
    }, 3000);
  };

  render() {
    return (
      <React.Fragment>
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
          type="password"
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          value="Login"
          fullWidth
          onClick={this.login}
          disableFocusRipple={true} disableRipple={true} disabled={this.state.isLoading}> login {this.state.isLoading ? (
            <CircularProgress color="secondary" size={25} />
          ) : ""}</Button>
        <br />
        <br />
        <Button variant="contained" onClick={this.props.openSignup} fullWidth>
          New User?Signup
        </Button>         
        <Snackbar
          message={this.state.snackbarMessage}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={this.state.snackbarState}
        />
      </React.Fragment>
    );
  }
}

export default withCookies(
  connect(
    null,
    mapDispatchToProps
  )(Login)
);
