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
        steps:state.remedyStep.remedySteps
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addStep: (stepNumber) => dispatch({type:actionTypes.ADD_STEP,payload:{"StepName":`Step${stepNumber}`,"description":""}})
    }
}

class AddRemedies extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            stepCounter :1
        }
    }
    
    componentDidMount(){
        console.log("add rem : ");
    }

AddRemedyStep = () => {
    this.setState({stepCounter:this.state.stepCounter+1});
    this.props.addStep(this.state.stepCounter);
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
                 <RemedyStep key={item.StepName} StepName={item.StepName}/>
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