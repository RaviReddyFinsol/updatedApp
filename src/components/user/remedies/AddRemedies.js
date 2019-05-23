import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//import FormHelperText from '@material-ui/core/FormHelperText';
//import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import RemedyStep from './RemedyStep';
import * as actionTypes from '../../../store/actionTypes';
import { connect } from "react-redux";
import axios from 'axios';

const mapStateToProps = state => {
    return {
        steps: state.remedyStep.remedySteps,
        stepCounter: state.remedyStep.stepCounter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addStep: (stepNumber) => dispatch({ type: actionTypes.ADD_STEP, payload: { "stepName": `Step${stepNumber}`, "description": "", "filePath": null } }),
        removeStep : () => dispatch({type:actionTypes.REMOVE_STEP}),
    }
}

class AddRemedies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            remedyName: "",
            remedyType: "H",
            remedyForGender: "B",
            age: "",
            bodyPart: "",
            timeToUse: "",
            videoLink: "",
            ingridients: "",
        }
    }

    componentDidMount() {
        console.log("add rem : ");
    }

    addRemedyStep = () => {
        if (this.props.stepCounter <= 10)
            this.props.addStep(this.props.stepCounter);
    }

    inputChanged = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    saveRemedy = (event) => {
        event.preventDefault();
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        let formData = new FormData();
        // formData.append("remedyName", this.state.remedyName);
        // formData.append("remedyType", this.state.remedyType);
        // formData.append("remedyForGender", this.state.remedyForGender);
        // formData.append("age", this.state.age);
        // formData.append("bodyPart", this.state.bodyPart);
        // formData.append("timeToUse", this.state.timeToUse);
        // formData.append("videoLink", this.state.videoLink);
        // formData.append("ingridients", this.state.remedyType);
        for (let step of this.props.steps) {
            //formData.append(`${step.stepName}_desc`, step.description);
            formData.append(`image`, step.filePath);
        }
        for (let ff of formData.entries()) {
            console.log(ff[0], ff[1]);
        }

        axios.post("http://localhost:9003/upload",formData,config)
        .then((response) => {
            alert("The file is successfully uploaded");
        }).catch((error) => {
    });

    }

    render() {
        return (
            <form onSubmit={this.saveRemedy}>
                <TextField label="Name" name="remedyName" onChange={this.inputChanged} />  {" Type"}
                <Select value={this.state.remedyType} onChange={this.inputChanged} name="remedyType">
                    <MenuItem value={"H"}>H</MenuItem>
                    <MenuItem value={"B"}>B</MenuItem>
                </Select> {" Type"}
                <Select value={this.state.remedyForGender} name="remedyForGender" onChange={this.inputChanged} >
                    <MenuItem value={"B"}>B</MenuItem>
                    <MenuItem value={"F"}>F</MenuItem>
                    <MenuItem value={"M"}>M</MenuItem>
                </Select>
                <TextField label="Age" name="age" onChange={this.inputChanged} value={this.state.age} />
                <TextField label="Part" name="bodyPart" onChange={this.inputChanged} value={this.state.bodyPart} />
                <TextField label="Time" name="timeToUse" onChange={this.inputChanged} value={this.state.timeToUse} />
                <TextField label="Video link" name="videoLink" onChange={this.inputChanged} value={this.state.videoLink} />
                <TextField label="Ingridients" name="ingridients" onChange={this.inputChanged} value={this.state.ingridients} />
                <br />
                {
                    this.props.steps ?
                        this.props.steps.map(item => (
                            <RemedyStep key={item.stepName} stepName={item.stepName} description={item.description} filePath={item.filePath} />
                        )) : "Steps here"
                }
                <br />
                <Button onClick={this.props.removeStep} > Delete last step</Button>
                <Button onClick={this.addRemedyStep}>+</Button>{" Add Step"}
                <br />
                <Button type="submit">Save</Button>
                <br />
            </form>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AddRemedies);