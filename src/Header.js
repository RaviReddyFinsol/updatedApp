import React, { Component } from 'react';
import {connect} from "react-redux";
import { withCookies } from "react-cookie";

const mapStateToProps = state => {
  return {
token:state.auth.token,
isDialog:state.dialog.isDialogOpened
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (num) => dispatch({type:'LOGIN',val:num}),
    userLogout: () => dispatch({type:'LOGOUT'})
  };
}

class Header extends Component {
   
    componentDidMount(){
      console.log("Header did mount ",this.props.token);      
    }
    
    componentWillMount(){
      console.log("Header will mount ",this.props.token,this.props.isDialog);
    }
    
    componentWillUpdate(){
      console.log("Header will update ",this.props.token);
    }
    
    componentDidUpdate(){
      console.log("Header did update ",this.props.token);
    }

    render() { 
      console.log("Header render ",this.props.token);
        return ( 
          <h1>header</h1>
      );
    }
}
 
export default  withCookies(
  connect(mapStateToProps,
    mapDispatchToProps)(Header));