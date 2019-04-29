import React,{ Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import * as actionTypes from '../../../store/actionTypes';

const mapDispatchToProps = dispatch =>{
    return {
        removeStep : (stepName) => dispatch({type:actionTypes.REMOVE_STEP,val:stepName})
    }
}

class RemedyStep extends Component{
    render(){
        return(
            <React.Fragment>
                <h4>{this.props.StepName}</h4>
                <TextField label="description"/>
                <input type="file" />
                <Button onClick={()=>this.props.removeStep(this.props.StepName)}>Remove</Button>
            </React.Fragment>
        )
    }
}

export default connect(null,mapDispatchToProps)(RemedyStep);