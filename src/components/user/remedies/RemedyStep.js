import React,{ Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import * as actionTypes from '../../../store/actionTypes';

const mapDispatchToProps = dispatch =>{
    return {
        removeStep : (stepName) => dispatch({type:actionTypes.REMOVE_STEP,val:stepName}),
        descriptionChanged : (stepName,description) => dispatch({type:actionTypes.DESCRIPTION_UPDATED,payload:{stepName,description}}),
        fileChanged : (stepName,filePath) => dispatch({type:actionTypes.FILE_CHANGED,payload:{stepName,filePath}})
    }
}

class RemedyStep extends Component{
    
    descriptionUpdated = event =>
    {
        this.props.descriptionChanged(this.props.stepName,event.value)
    }
    
    fileUpdated = event =>
    {
        this.props.fileChanged(this.props.stepName,event.value)
    }
    
    render(){
        return(
            <React.Fragment>
                <h4>{this.props.stepName}</h4>
                <TextField label="description" value={this.props.description} onChange={this.descriptionUpdated}/>
                <input type="file" value={this.props.filePath} onChange={this.fileUpdated}/>
                <Button onClick={()=>this.props.removeStep(this.props.stepName)}>Remove</Button>
            </React.Fragment>
        )
    }
}

export default connect(null,mapDispatchToProps)(RemedyStep);