import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

class EditSubGroup extends Component {
  isComponentUnmounted = false;
  constructor(props) {
    super(props);
    this.state = {
      subGroupName: "",
      groups: [],
      selectedGroup: "",
      image: "",
      imageURL: "",
      snackbarState: false,
      snackbarMessage: "",
      isComponentLoading: false,
      isSubGroupSaveLoading: false,
    };
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

  updateSubGroup = event => {
    event.preventDefault();
    if (
      this.state.subGroupName !== undefined &&
      this.state.subGroupName.trim().length !== 0
    ) {
      if (this.state.selectedGroup !== undefined || this.state.selectedGroup !== "") {
        this.setState({ isSubGroupSaveLoading: true }, () => {
          const config = {
            headers: {
              "content-type": "multipart/form-data"
            }
          };

          const formData = new FormData();
          formData.append("subGroupName", this.state.subGroupName);
          formData.append("group", this.state.selectedGroup);
          formData.append("image", this.state.image);
          formData.append("imageURL", this.state.imageURL);

          axios
            .put(
              "http://localhost:9003/api/subGroups",
              formData,
              {
                params: {
                  userID: this.props.match.params.token,
                  subGroupID: this.props.match.params.id
                }
              },
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
                snackbarState: true,
                snackbarMessage: "Unable to connect to server"
              });
              this.snackbarTimeout();
            });
        });
      } else {
        this.setState({
          snackbarState: true,
          snackbarMessage: "Please select valid SubGroup"
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

  componentDidMount() {
    this.setState({ isComponentLoading: true }, () => {
      axios
        .get("http://localhost:9003/api/groups")
        .then(groupResponse => {
          if (groupResponse.data.isSuccess) {
            axios
              .get("http://localhost:9003/api/subGroups/subGroup", {
                params: {
                  userID: this.props.match.params.token,
                  subGroupID: this.props.match.params.id
                }
              })
              .then(response => {
                if (response.data.isSuccess) {          
                  if(!response.data.subGroup.group)
                  {
                    response.data.subGroup.group = "";
                  }
                  this.setState({
                    groups: groupResponse.data.groups,
                    selectedGroup: response.data.subGroup.group,
                    subGroupName: response.data.subGroup.subGroupName,
                    imageURL: response.data.subGroup.imagePath,
                    isComponentLoading: false
                  });
                } else
                  this.setState({
                    snackbarMessage: response.message,
                    snackbarState: true,
                    isComponentLoading: false
                  });
                this.snackbarTimeout();
              })
              .catch(error => {
                this.setState({
                  snackbarMessage: "unable to connect server",
                  snackbarState: true,
                  isComponentLoading: false
                });
                this.snackbarTimeout();
              });
          } else
            this.setState({
              snackbarMessage: groupResponse.message,
              snackbarState: true,
              isComponentLoading: false
            });
          this.snackbarTimeout();
        })
        .catch(err => {
          this.setState({
            snackbarMessage: "unable to connect server",
            snackbarState: true,
            isComponentLoading: false
          });
          this.snackbarTimeout();
        });
    });
  }

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
                    <form onSubmit={this.updateSubGroup}>
                      <h4 style={{ color: "purple" }}>Edit SubGroup</h4>
                      <TextField
                        autoFocus={true}
                        label="SGN"
                        name="subGroupName"
                        onChange={this.inputChanged}
                        value={this.state.subGroupName}
                      />
                      <br />{"G "}
                      <Select
                        value={this.state.selectedGroup}
                        onChange={this.inputChanged}
                        name="selectedGroup" 
                      >
                        {this.state.groups ? (
                          this.state.groups.map(group => (
                            <MenuItem key={group._id} value={group._id}>
                              {" "}
                              {group.groupName}{" "}
                            </MenuItem>
                          ))
                        ) : (
                            <MenuItem value={""} />
                          )}
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
                          {this.state.imageURL ? "Change image" : "Upload image"}
                        </Button>
                      </label>
                      <br />

                      <img src={this.state.imageURL} alt={""} />
                      {this.state.imageURL !== "" ? (<Tooltip title="Remove Image" placement="right">
                        <IconButton aria-label="Delete" onClick={this.removeImage} >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Tooltip>) : ""}

                      <br />
                      <Button type="submit" variant="contained" color="primary" disableFocusRipple={true} disableRipple={true} disabled={this.state.isSubGroupSaveLoading}> update {this.state.isSubGroupSaveLoading ? (
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

export default EditSubGroup;
