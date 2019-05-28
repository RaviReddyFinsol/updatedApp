import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";

class AddGroup extends Component {
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
    formData.append("image", this.state.image);
    formData.append("token", this.props.match.params.token);

    axios
      .post("http://localhost:9003/api/catogery/group/add", formData, config)
      .then(response => {
        this.setState({
          snackbarState: true,
          snackbarMessage: response.message
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
        <img src={this.state.imageURL} alt={"Group icon preview"} />
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
    );
  }
}

export default AddGroup;
