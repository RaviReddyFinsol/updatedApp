import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

class ViewChildGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: "",
            subGroupName: "",
        }
    }

    inputChanged = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    fileUpdated = event => {
        this.setState({ [event.target.name]: event.target.files[0] })
    }

    saveChildGroup = (event) => {
        event.preventDefault();
        var childGroupDetails = {
            childGroupName: this.state.childGroupName,
            subGroupName: this.state.subGroupName
        };

        axios.post("http://localhost:9003/childGroup/addChildGroup", childGroupDetails)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
            });

    }
    render() {
        return (
            <form onSubmit={this.saveChildGroup}>
                <TextField label="GN" name="childGroupName" onChange={this.inputChanged} /><br />
                {"SG"}
                <Select value={this.state.remedyType} onChange={this.inputChanged} name="remedyType">
                    <MenuItem value={"H"}>H</MenuItem>
                    <MenuItem value={"B"}>B</MenuItem>
                </Select>
                <Button type="submit">S</Button>
            </form>
        )
    }
}

export default ViewChildGroup;