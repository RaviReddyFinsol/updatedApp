import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";

const mapStateToProps = state => {
  return {
    groups: state.groups.groups
  };
};

class EditGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: "",
      image: "",
      imageURL: "",
      snackbarState: false,
      snackbarMessage: ""
    };
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

  saveGroup = event => {
    event.preventDefault();
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    const formData = new FormData();
    formData.append("groupName", this.state.groupName);
    formData.append("userID", this.props.match.params.token);
    formData.append("groupID", this.props.match.params.id);
    formData.append("image", this.state.image);

    axios
      .post("http://localhost:9003/api/groups/group/edit", formData, config)
      .then(response => {
        this.setState({
          snackbarMessage: "Group updated successfully",
          snackbarState: true
        });
      })
      .catch(error => {
        this.setState({
          snackbarState: true,
          snackbarMessage: "Something went wrong.Try again after some time"
        });
      });

    setTimeout(() => {
      this.setState({ snackbarState: false });
    }, 3000);
  };

  componentDidMount() {
    var editGroup = this.props.groups.find(
      i => i._id === this.props.match.params.id
    );
    if (editGroup === undefined) {
      axios
        .get("http://localhost:9003/api/groups/group", {
          params: {
            token: this.props.match.params.token,
            groupID: this.props.match.params.id
          }
        })
        .then(response => {
          this.setState({
            groupName: response.data.data.groupName,
            imageURL: response.data.data.imagePath
          });
        })
        .catch(error => {});
    }
    if (editGroup !== undefined) {
      this.setState({
        groupName: editGroup.groupName,
        imageURL: editGroup.imagePath
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.saveGroup}>
        <TextField
          label="GN"
          name="groupName"
          onChange={this.inputChanged}
          value={this.state.groupName}
        />
        <br />
        <img src={this.state.imageURL} alt={""} />
        <br />
        <input type="file" onChange={this.fileUpdated} accept="image/*" />
        <br />
        <Button type="submit">u</Button>
        <Snackbar
          message={this.state.snackbarMessage}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={this.state.snackbarState}
        />
      </form>
    );
  }
}

export default connect(mapStateToProps)(EditGroup);
