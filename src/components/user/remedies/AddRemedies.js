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

    constructor(props){
        super(props);
        this.state = {
            remedyName:"",
            remedyType:"H",
            remedyForGender:"B",
            age:"",
            bodyPart:"",
            timeToUse:"",
            videoLink:"",
            ingridients:"",
        }
    }
    
    componentDidMount(){
        console.log("add rem : ");
    }

AddRemedyStep = () => {
    if(this.props.stepCounter <= 10)
        this.props.addStep(this.props.stepCounter);
}

inputChanged = (event) =>{
    this.setState({[event.target.name]:event.target.value})
}

    render(){
        return(
            <form>
                 <TextField label="Name" name="remedyName" onChange={this.inputChanged}/>  {" Type"} 
                 <Select value={this.state.remedyType} onChange={this.inputChanged} name="remedyType">
            <MenuItem value={"H"}>H</MenuItem>
            <MenuItem value={"B"}>B</MenuItem>
          </Select> {" Type"} 
          <Select value={this.state.remedyForGender} name="remedyForGender" onChange={this.inputChanged} >
            <MenuItem value={"B"}>B</MenuItem>
            <MenuItem value={"F"}>F</MenuItem>
            <MenuItem value={"M"}>M</MenuItem>
          </Select>
          <TextField label = "Age" name="age" onChange={this.inputChanged} value={this.state.age}/>
          <TextField label = "Part" name="bodyPart" onChange={this.inputChanged} value={this.state.bodyPart}/>
          <TextField label = "Time" name="timeToUse" onChange={this.inputChanged} value={this.state.timeToUse}/>
          <TextField label = "Video link" name="videoLink" onChange={this.inputChanged} value={this.state.videoLink} />
          <TextField label = "Ingridients" name="ingridients" onChange={this.inputChanged} value={this.state.ingridients}/>
          <br />
          {
              this.props.steps ?
              this.props.steps.map(item=>(
                 <RemedyStep key={item.stepName} stepName={item.stepName} description={item.description} filePath={item.filePath}/>
              )) : "Steps here"
          }
          <br />
          <Button onClick={this.AddRemedyStep}>+</Button>{" Add Step"}
          <br/>
          <Button >Save</Button>
                 <br /> 
            </form>
        );
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(AddRemedies);