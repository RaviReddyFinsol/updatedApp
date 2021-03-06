import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

class AddSubGroup extends Component {
  isComponentUnmounted = false;
  constructor(props) {
    super(props);
    this.state = {
      subGroupName: "",
      groupName: "",
      image: "",
      imageURL: "",
      snackbarState: false,
      snackbarMessage: "",
      groups: [], isSubGroupSaveLoading: false, isComponentLoading: false
    };
  }

  componentDidMount() {
    this.setState({ isComponentLoading: true }, () => {
      axios
        .get("http://localhost:9003/api/groups", {
          params: { userID: this.props.match.params.token }
        })
        .then(response => {
          this.setState({ isComponentLoading: false, groups: response.data.groups });
        })
        .catch(err => {
          this.setState({ isComponentLoading: false });
        });
    });
  }

  inputChanged = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  fileUpdated = event => {
    let file = event.target.files[0];
    const MIME_TYPE_MAP = {
      "image/png": "png",
      "image/jpeg": "jpg",
      "image/jpg": "jpg"
    };
    if (file !== undefined) {
      if (file.size < 200000) {
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

  saveSubGroup = event => {
    event.preventDefault();
    if (
      this.state.subGroupName !== undefined &&
      this.state.subGroupName.trim().length !== 0
    ) {
      if (this.state.groupName !== "") {
        this.setState({ isSubGroupSaveLoading: true }, () => {
          const config = {
            headers: {
              "content-type": "multipart/form-data"
            }
          };
          let formData = new FormData();

          formData.append("subGroupName", this.state.subGroupName);
          formData.append("group", this.state.groupName);
          formData.append("image", this.state.image);

          axios
            .post(
              "http://localhost:9003/api/subGroups",
              formData,
              { params: { userID: this.props.match.params.token } },
              config
            )
            .then(response => {
              this.setState({
                snackbarMessage: response.data.message,
                snackbarState: true,
                isSubGroupSaveLoading: false
              });
              this.snackbarTimeout();
            })
            .catch(error => {
              this.setState({
                snackbarMessage: "unable to connect to server",
                snackbarState: true,
                isSubGroupSaveLoading: false
              });
              this.snackbarTimeout();
            });
        });
      } else {
        this.setState({
          snackbarMessage: "Please select any group",
          snackbarState: true,
          isSubGroupSaveLoading: false
        });
        this.snackbarTimeout();
      }
    } else {
      this.setState({
        snackbarMessage: "Please enter valid SubGroup name",
        snackbarState: true,
        isSubGroupSaveLoading: false
      });
      this.snackbarTimeout();
    }
  };

  componentWillUnmount() {
    this.isComponentUnmounted = true;
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
        {this.state.isComponentLoading ? (
          <CircularProgress />
        ) : (
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12} sm={10} lg={8}>              
                <Paper style={{ padding: "10px" }}>
                  {this.state.groups.length !== 0 ? (
                    <form onSubmit={this.saveSubGroup}>
                      <h4 style={{color:"purple"}}>Add SubGroup</h4>
                      <TextField
                        autoFocus={true}
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
                      <Button type="submit" variant="contained" color="primary" disableFocusRipple={true} disableRipple={true} disabled={this.state.isSubGroupSaveLoading}> save {this.state.isSubGroupSaveLoading ? (
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
                  ) : (
                      <h3>{"No group exists.Please add group first"}</h3>
                    )}
                </Paper>
              </Grid>
            </Grid>
          )}
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(AddSubGroup);
