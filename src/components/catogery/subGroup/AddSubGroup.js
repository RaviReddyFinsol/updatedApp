import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import { connect } from "react-redux";
import { getGroups } from "../../../store/actionCreactors/groupActions";

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    groups: state.groups.groups
  };
};

class AddSubGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subGroupName: "",
      groupName: "",
      image: "",
      imageURL: "",
      snackbarState: false,
      snackbarMessage: "",
      groups: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:9003/api/groups/groups", {
        params: { token: this.props.match.params.token }
      })
      .then(response => {
        this.setState({ groups: response.data.groups });
      });
  }

  inputChanged = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

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

  saveSubGroup = event => {
    event.preventDefault();
    if (this.state.groupName !== "") {
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      let formData = new FormData();

      formData.append("subGroupName", this.state.subGroupName);
      formData.append("groupName", this.state.groupName);
      formData.append("image", this.state.image);
      formData.append("token", this.props.match.params.token);

      axios
        .post("http://localhost:9003/api/subGroups/add", formData, config)
        .then(response => {
          this.setState({
            snackbarMessage: "SubGroup added successfully",
            snackbarState: true
          });
        })
        .catch(error => {});

      this.setState({
        snackbarMessage: "Something went wrong.Please try again",
        snackbarState: true
      });
      setTimeout(() => {
        this.setState({ snackbarState: false });
      }, 2000);
    } else {
      this.setState({
        snackbarState: true,
        snackbarMessage: "group name should not be empty"
      });
      setTimeout(() => {
        this.setState({ snackbarState: false });
      }, 2000);
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.state.groups.length !== 0 ? (
          <form onSubmit={this.saveSubGroup}>
            <TextField
              label="SGN"
              name="subGroupName"
              onChange={this.inputChanged}
              value={this.state.subGroupName}
            />
            <br />
            {"G"}{" "}
            <Select
              value={this.state.groupName}
              onChange={this.inputChanged}
              name="groupName"
            >
              {this.state.groups.map(group => (
                <MenuItem key={group._id} value={group._id}>
                  {group.groupName}
                </MenuItem>
              ))}
            </Select>
            <br />
            <img src={this.state.imageURL} alt={""} />
            <br />
            <input type="file" onChange={this.fileUpdated} accept="image/*" />
            <br />
            <Button type="submit">S</Button>
            <Snackbar
              message={this.state.snackbarMessage}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              open={this.state.snackbarState}
            />
          </form>
        ) : (
          <h3>{"No group exists.Please add group first"}</h3>
        )}
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  { getGroups }
)(AddSubGroup);
