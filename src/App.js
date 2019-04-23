import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {
    token:state.token
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: () => dispatch({type:'LOGIN'}),
    userLogout: () => dispatch({type:'LOGOUT'})
  };
}

class App extends Component {

shouldComponentUpdate(){
  console.log("app should update ",this.props.token);
  return true;
}

componentWillUpdate(){
  console.log("app will update ",this.props.token);
}

componentDidUpdate(){
  console.log("app did update ",this.props.token);
}

  componentDidMount(){
  console.log("app did mount",this.props.token);
  //this.props.userLogin();
  //console.log("app after did ",this.props.token);
}

componentWillMount(){
  console.log("app will mount",this.props.token);
  this.props.userLogin();
  // console.log("app after will ",this.props.token);
}
  render() {
    console.log("app render ",this.props.token);
    return (
      <div className="App">
        {/* <Header /> */}
        <Main />
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
