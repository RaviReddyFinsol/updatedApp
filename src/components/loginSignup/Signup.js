import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actionTypes";
import { withCookies } from "react-cookie";
import { setCookie } from "../../cookies/cookie";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: () => dispatch({ type: actionTypes.CLOSE_DIALOG }),
    userLogin: token => dispatch({ type: actionTypes.USER_LOGIN, val: token })
  };
};

export class Signup extends Component {
  isComponentUnmounted = false;
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      signupID: "",
      password: "",      
      snackbarState: false,
      snackbarMessage: "",
      isLoading: false,
    };
  }

  componentWillUnmount() {
    this.isComponentUnmounted = true;
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  signUp = () => {
    if (this.state.userName === undefined || this.state.userName.length === 0) {
      this.setState({
        snackbarMessage: "Invalid User name",
        snackbarState: true,
        isLoading: false
      });
      this.snackbarTimeout();
      return;
    }
    if (this.state.signupID === undefined || this.state.signupID.length === 0) {
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
        } 
        this.setState({ snackbarMessage: val.data.message,snackbarState:true,isLoading:false });
        this.snackbarTimeout();
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
          disableFocusRipple={true} disableRipple={true} disabled={this.state.isLoading}> Signup {this.state.isLoading ? (
            <CircularProgress color="secondary" size={25} />
          ) : ""}</Button>
        <br />
        <br />
        <Button variant="contained" onClick={this.props.openLogin} fullWidth >
          Existing User?Login
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
  )(Signup)
);
