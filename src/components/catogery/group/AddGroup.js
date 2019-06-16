import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";

class AddGroup extends Component {
  isComponentUnmounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
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

  componentWillUnmount() {
    this.isComponentUnmounted = true;
  }

  fileUpdated = event => {
    const MIME_TYPE_MAP = {
      "image/png": "png",
      "image/jpeg": "jpg",
      "image/jpg": "jpg"
    };
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
        this.snackbarTimeout();
      }
      if (MIME_TYPE_MAP[file.type]) {
        this.setState({ image: event.target.files[0] });
        this.setState({ imageURL: URL.createObjectURL(event.target.files[0]) });
      } else {
        event.target.value = null;
        this.setState({
          image: "",
          imageURL: "",
          snackbarState: true,
          snackbarMessage: "Please select valid image(JPG/JPEG/PNG)"
        });
        this.snackbarTimeout();
      }
    }
  };

  saveGroup = event => {
    event.preventDefault();
    if (
      this.state.groupName !== undefined ||
      this.state.groupName !== "" ||
      this.state.groupName.length !== 0
    ) {
      this.setState({ isLoading: true }, () => {
        const config = {
          headers: {
            "content-type": "multipart/form-data"
          }
        };

        const formData = new FormData();
        formData.append("groupName", this.state.groupName);
        formData.append("image", this.state.image);

        axios
          .post(
            "http://localhost:9003/api/groups",
            formData,
            { params: { userID: this.props.match.params.token } },
            config
          )
          .then(response => {
            this.setState({
              snackbarMessage: response.data.message,
              snackbarState: true,
              isLoading: false
            });
            this.snackbarTimeout();
          })
          .catch(error => {
            this.setState({
              snackbarMessage: "Unable to connect to server",
              snackbarState: true,
              isLoading: false
            });
            this.snackbarTimeout();
          });
      });
    } else {
      this.setState({
        snackbarMessage: "Please enter valid Group name",
        snackbarState: true,
        isLoading: false
      });
      this.snackbarTimeout();
    }
  };

  snackbarTimeout = () => {
    setTimeout(() => {
      if (!this.isComponentUnmounted) {
        this.setState({ snackbarState: false });
      }
    }, 3000);
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <CircularProgress />
        ) : (
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
        )}
      </React.Fragment>
    );
  }
}

export default AddGroup;
