import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';

class ViewSubGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subGroupName: "",
            groupName: "",
            image: "",
        }
    }

    inputChanged = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    fileUpdated = event => {
        this.setState({ [event.target.name]: event.target.files[0] })
    }

    saveSubGroup = (event) => {
        event.preventDefault();
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        let formData = new FormData();

        formData.append("subGroupName", this.state.groupName);
        formData.append("groupName", this.state.groupName);
        formData.append("image", this.state.image);
        formData.append("token",this.props.match.params.token);

        axios.post("http://localhost:9003/subGroup/addSubGroup", formData, config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
            });

            this.setState({snackbarState:true});
            setTimeout(() => {      
              this.setState({snackbarState:false})},2000);
    }

    render() {
        return (
            <form onSubmit={this.saveSubGroup}>
                <TextField label="SGN" name="subGroupName" onChange={this.inputChanged} /><br />
                {"G"}
                <Select value={this.state.remedyType} onChange={this.inputChanged} name="remedyType">
                    <MenuItem value={"H"}>H</MenuItem>
                    <MenuItem value={"B"}>B</MenuItem>
                </Select>
                <input type="file" onChange={this.fileUpdated} accept="image/*" /><br />
                <Button type="submit">S</Button>
                <Snackbar message={"snack demo"} 
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={this.state.snackbarState} />
            </form>
        )
    }
}

export default ViewSubGroup;