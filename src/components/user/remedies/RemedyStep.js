import React,{ Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import * as actionTypes from '../../../store/actionTypes';

const mapDispatchToProps = dispatch =>{
    return {
        
        descriptionChanged : (stepName,description) => dispatch({type:actionTypes.DESCRIPTION_UPDATED,payload:{stepName,description}}),
        fileChanged : (stepName,filePath) => dispatch({type:actionTypes.FILE_CHANGED,payload:{stepName,filePath}})
    }
}

class RemedyStep extends Component{
    
    descriptionUpdated = event =>
    {
        this.props.descriptionChanged(this.props.stepName,event.target.value)
    }
    
    fileUpdated = event =>
    {
        this.props.fileChanged(this.props.stepName,event.target.files[0])
    }
    
    render(){
        return(
            <React.Fragment>
                <h4>{this.props.stepName}</h4>
                <TextField label="description" value={this.props.description} onChange={this.descriptionUpdated} required/>
                <input type="file" onChange={this.fileUpdated} accept="image/*" />
            </React.Fragment>
        )
    }
}

export default connect(null,mapDispatchToProps)(RemedyStep);