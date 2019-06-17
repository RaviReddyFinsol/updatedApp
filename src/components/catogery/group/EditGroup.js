import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const mapStateToProps = state => {
  return {
    groups: state.groups.groups
  };
};

class EditGroup extends Component {
  isComponentUnmounted = false;
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

  removeImage = () => {
    this.setState({ image: "", imageURL: "" });
  }

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
          .put(
            "http://localhost:9003/api/groups",
            formData,
            {
              params: {
                userID: this.props.match.params.token,
                groupID: this.props.match.params.id
              }
            },
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
              snackbarState: true,
              snackbarMessage: "Unable to connect to server",
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

  componentDidMount() {
    this.setState({ isLoading: true }, () => {
      axios
        .get("http://localhost:9003/api/groups/group", {
          params: {
            userID: this.props.match.params.token,
            groupID: this.props.match.params.id
          }
        })
        .then(response => {
          if (response.data.isSuccess) {
            this.setState({
              groupName: response.data.group.groupName,
              imageURL: response.data.group.imagePath,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
              snackbarState: true,
              snackbarMessage: response.data.message
            });
            this.snackbarTimeout();
          }
        })
        .catch(error => {
          this.setState({
            isLoading: false,
            snackbarState: true,
            snackbarMessage: "unable to connect to server"
          });
          this.snackbarTimeout();
        });
    });
  }

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
            <br />
        <br />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={this.fileUpdated}
        />
        <label htmlFor="raised-button-file">
          <Button component="span" variant="outlined" disableFocusRipple={true} disableRipple={true}>
            {this.state.image ? "Change image" : "Upload image"}
          </Button>
        </label>
        <br />
        
          <img src={this.state.imageURL} alt={""} />
          {this.state.image !== "" ? (<Tooltip title="Remove Image" placement="right">
            <IconButton aria-label="Delete" onClick={this.removeImage} >
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>) : ""}
        
        <br />
        <Button type="submit" variant="contained" color="primary" disableFocusRipple={true} disableRipple={true} disabled={this.state.isLoading}> update {this.state.isLoading ? (
          <CircularProgress color="secondary" size={25} />
        ) : ""}</Button>
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

export default connect(mapStateToProps)(EditGroup);
