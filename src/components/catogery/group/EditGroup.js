import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Snackbar from '@material-ui/core/Snackbar';

class EditGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: "",
      image: "",
      snackbarState: false,
      snackbarMessage: ""
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
        this.setState({ snackbarState: true, snackbarMessage: response });
      })
      .catch(error => {
        this.setState({ snackbarState: true, snackbarMessage: error });
      });

    setTimeout(() => {
      this.setState({ snackbarState: false })
    }, 3000);
  };

  render() {
    return (
      <form onSubmit={this.saveGroup}>
        <TextField label="GN" name="groupName" onChange={this.inputChanged} value={this.state.groupName}/>
        <br />
        <input type="file" onChange={this.fileUpdated} accept="image/*" />
        <br />
        <Button type="submit">S</Button>
        <Snackbar message={"snack demo"}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.snackbarState} />
      </form>
    );
  }
}

export default EditGroup;
