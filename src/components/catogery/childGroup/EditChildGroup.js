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

class EditChildGroup extends Component {
  isComponentUnmounted = false;
  constructor(props) {
    super(props);
    this.state = {
      subGroups: [],
      selectedSubGroup: "",
      childGroupName: "",
      image: "",
      imageURL: "",
      isComponentLoading: false,
      isChildGroupSaveLoading: false,
      snackbarState: false,
      snackbarMessage: ""
    };
  }

  inputChanged = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  removeImage = () => {
    this.setState({ image: "", imageURL: "" });
  }

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

  updateChildGroup = event => {
    event.preventDefault();
    if (
      this.state.childGroupName !== "" ||
      this.state.childGroupName !== undefined ||
      this.state.childGroupName.length !== 0
    ) {
      if (this.state.selectedSubGroup !== "") {
        this.setState({ isChildGroupSaveLoading: true }, () => {
          const config = {
            headers: {
              "content-type": "multipart/form-data"
            }
          };

          const formData = new FormData();
          formData.append("subGroup", this.state.selectedSubGroup);
          formData.append("childGroupName", this.state.childGroupName);
          formData.append("image", this.state.image);
          formData.append("imageURL", this.state.imageURL);

          axios
            .put(
              "http://localhost:9003/api/childGroups",
              formData,
              {
                params: {
                  userID: this.props.match.params.token,
                  childGroupID: this.props.match.params.id
                }
              },
              config
            )
            .then(response => {
              this.setState({
                snackbarMessage: response.data.message,
                snackbarState: true,
                isChildGroupSaveLoading: false
              });
              this.snackbarTimeout();
            })
            .catch(error => {
              this.setState({
                snackbarState: true,
                snackbarMessage: "Unable to connect to server",
                isChildGroupSaveLoading: false
              });
              this.snackbarTimeout();
            });
        });
      } else {
        this.setState({
          snackbarMessage: "Please select valid SubGroup",
          snackbarState: true
        });
        this.snackbarTimeout();
      }
    } else {
      this.setState({
        snackbarMessage: "Please enter valid ChildGroup name",
        snackbarState: true
      });
      this.snackbarTimeout();
    }
  };

  componentDidMount() {
    this.setState({ isComponentLoading: true }, () => {
      axios
        .get("http://localhost:9003/api/subGroups")
        .then(groupResponse => {
          if (groupResponse.data.isSuccess) {
            axios
              .get("http://localhost:9003/api/childGroups/childGroup", {
                params: {
                  userID: this.props.match.params.token,
                  childGroupID: this.props.match.params.id
                }
              })
              .then(response => {
                if (response.data.isSuccess) {
                  this.setState({
                    subGroups: groupResponse.data.subGroups,
                    selectedSubGroup: response.data.childGroup.subGroup,
                    childGroupName: response.data.childGroup.childGroupName,
                    imageURL: response.data.childGroup.imagePath,
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
                  <h4 style={{ color: "purple" }}>Edit ChildGroup</h4>
                  {this.state.subGroups.length !== 0 ? (
                    <form onSubmit={this.updateChildGroup}>
                      <TextField
                        autoFocus={true}
                        label="CGN"
                        name="childGroupName"
                        onChange={this.inputChanged}
                        value={this.state.childGroupName}
                      />
                      <br />

                      <Select
                        value={this.state.selectedSubGroup}
                        onChange={this.inputChanged}
                        name="subGroupName"
                      >
                        {this.state.subGroups.map(subGroup => (
                          <MenuItem value={subGroup._id} key={subGroup._id}>
                            {" "}
                            {subGroup.groupName}{" "}
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
                      <Button type="submit" variant="contained" color="primary" disableFocusRipple={true} disableRipple={true} disabled={this.state.isChildGroupSaveLoading}> update {this.state.isChildGroupSaveLoading ? (
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
                      <h3>{"No sub group exists.Please add sub group first"}</h3>
                    )}
                </Paper>
              </Grid>
            </Grid>
          )}
      </React.Fragment>
    );
  }
}

export default EditChildGroup;
