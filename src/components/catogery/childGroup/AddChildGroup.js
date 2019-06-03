import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from "react-redux";
import { getSubGroups } from "../../../store/actionCreactors/subGroupActions";

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        subGroups: state.subGroups.subGroups
    };
};

class AddChildGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subGroupName: "",
            childGroupName: "",
            image: "",
            imageURL: "",
            snackbarState: false,
            snackbarMessage: ""
        }
    }

    componentDidMount() {
        this.props.getGroups(this.props.token);
    }

    inputChanged = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    fileUpdated = event => {
        let file = event.target.files[0];
        if (file !== undefined) {
            if (file.size < 20000) {
                this.setState({ image: event.target.files[0] });
                this.setState({ imageURL: URL.createObjectURL(event.target.files[0]) });
            } else {
                event.target.value = null;
                this.setState({
                    image: "",
                    imageURL: "",
                    snackbarState: true,
                    snackbarMessage: "Please select image which is less than 200Kb"
                });
                setTimeout(() => {
                    this.setState({ snackbarState: false });
                }, 3000);
            }
        }
    };

    saveChildGroup = (event) => {
        event.preventDefault();
        if (this.state.subGroupName !== "") {

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            let formData = new FormData();

            formData.append("subGroupName", this.state.subGroupName);
            formData.append("childGroupName", this.state.childGroupName);
            formData.append("image", this.state.image);
            formData.append("token", this.props.match.params.token);

            axios.post("http://localhost:9003/subGroup/addSubGroup", formData, config)
                .then((response) => {
                    alert("The file is successfully uploaded");
                }).catch((error) => {
                });

            this.setState({ snackbarState: true });
            setTimeout(() => {
                this.setState({ snackbarState: false })
            }, 2000);
        }
        else {
            this.setState({ snackbarState: true, snackbarMessage: "group name should not be empty" });
            setTimeout(() => {
                this.setState({ snackbarState: false })
            }, 2000);
        }
    }

    render() {
        return (
            <React.Fragment>
            {
                this.props.subGroups.length !== 0 ? ( 
                    <form onSubmit={this.saveChildGroup}>
                    <TextField label="CGN" name="childGroupName" onChange={this.inputChanged} value={this.state.childGroupName}/><br />
                   
                          <Select value={this.state.subGroupName} onChange={this.inputChanged} name="subGroupName">
                           {  this.props.subGroups.map(subGroup => ((<MenuItem value={subGroup._id}> {subGroup.groupName} </MenuItem>))) }
                         </Select>  
                    <br />
                    <img src={this.state.imageURL} alt={""} />
                    <br />
                    <input type="file" onChange={this.fileUpdated} accept="image/*" /><br />
                    <Button type="submit">S</Button>
                    <Snackbar message={"snack demo"}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        open={this.state.snackbarState} />
                        </form>
                ) : (<h3>{"No sub group exists.Please add sub group first"}</h3>)
            }
            </React.Fragment>
        )
    }
}

export default connect(
    mapStateToProps,
    { getSubGroups }
)(AddChildGroup);