import React,{Component} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//import FormHelperText from '@material-ui/core/FormHelperText';
//import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import RemedyStep from './RemedyStep';
import * as actionTypes from '../../../store/actionTypes';
import {connect} from "react-redux";

const mapStateToProps = state => {
    return{
        steps:state.remedyStep.remedySteps,
        stepCounter:state.remedyStep.stepCounter
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addStep: (stepNumber) => dispatch({type:actionTypes.ADD_STEP,payload:{"stepName":`Step${stepNumber}`,"description":"","filePath":""}})
    }
}

class AddRemedies extends Component{
    
    componentDidMount(){
        console.log("add rem : ");
    }

AddRemedyStep = () => {
    this.setState({stepCounter:this.props.stepCounter});
    this.props.addStep(this.props.stepCounter);
}

    render(){
        return(
            <form>
                 <TextField label="Name"/>  {" Type"} 
                 <Select>
            <MenuItem>H</MenuItem>
            <MenuItem>B</MenuItem>
          </Select> {" Type"} 
          <Select>
            <MenuItem>B</MenuItem>
            <MenuItem>F</MenuItem>
            <MenuItem>M</MenuItem>
          </Select>
          <TextField label = "Age" />
          <TextField label = "Part" />
          <TextField label = "Time" />
          <TextField label = "Video link" />
          <TextField label = "Ingridients" />
          <br />
          {
              this.props.steps ?
              this.props.steps.map(item=>(
                 <RemedyStep key={item.stepName} stepName={item.stepName} description={item.description} filePath={item.filePath}/>
              )) : "Steps here"
          }
          
          <Button onClick={this.AddRemedyStep}>+</Button>{" Add Step"}
          <br/>
          <Button >Save</Button>
                 <br /> 
            </form>
        );
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(AddRemedies);