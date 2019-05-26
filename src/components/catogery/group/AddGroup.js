import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

class AddGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: "",
      image: ""
    };
  }

  inputChanged = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  fileUpdated = event => {
    this.setState({ image: event.target.files[0] });
  };

  saveGroup = event => {
    event.preventDefault();
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    let formData = new FormData();

    formData.append("groupName", this.state.groupName);
    formData.append("image", this.state.image);
    formData.append("token", this.props.match.params.token);
    console.log(this.state.image);
    axios
      .post("http://localhost:9003/api/catogery/group/add", formData, config)
      .then(response => {
        alert("The file is successfully uploaded");
      })
      .catch(error => {});
  };

  render() {
    return (
      <form onSubmit={this.saveGroup}>
        <TextField label="GN" name="groupName" onChange={this.inputChanged} />
        <br />
        <input type="file" onChange={this.fileUpdated} accept="image/*" />
        <br />
        <Button type="submit">S</Button>
      </form>
    );
  }
}

export default AddGroup;
