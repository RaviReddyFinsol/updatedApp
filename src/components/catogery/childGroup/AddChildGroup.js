import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

class AddChildGroup extends Component {
  isComponentUnmounted = false;
  constructor(props) {
    super(props);
    this.state = {
      subGroupName: "",
      subGroups: [],
      childGroupName: "",
      image: "",
      imageURL: "",
      snackbarState: false,
      snackbarMessage: "",
      isComponentLoading: false,
      isChildGroupSaveLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isComponentLoading: true }, () => {
      axios
        .get("http://localhost:9003/api/subGroups", {
          params: { userID: this.props.match.params.token }
        })
        .then(response => {
          if (response.data.isSuccess)
            this.setState({
              subGroups: response.data.subGroups,
              isComponentLoading: false
            });
          else {
            this.setState({
              isComponentLoading: false,
              snackbarMessage: response.message,
              snackbarState: true
            });
            this.snackbarTimeout();
          }
        })
        .catch(err => {
          this.setState({
            isComponentLoading: false,
            snackbarMessage: "unable to connect to server",
            snackbarState: true
          });
          this.snackbarTimeout();
        });
    });
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

  saveChildGroup = event => {
    event.preventDefault();
    debugger;
    if (
      this.state.childGroupName !== undefined &&
      this.state.childGroupName.trim().length !== 0
    ) {
      if (this.state.subGroupName !== "") {
        this.setState({ isChildGroupSaveLoading: true }, () => {
          const config = {
            headers: {
              "content-type": "multipart/form-data"
            }
          };
          let formData = new FormData();

          formData.append("subGroup", this.state.subGroupName);
          formData.append("childGroupName", this.state.childGroupName);
          formData.append("image", this.state.image);

          axios
            .post(
              "http://localhost:9003/api/childGroups",
              formData,
              { params: { userID: this.props.match.params.token } },
              config
            )
            .then(response => {
              this.setState({
                snackbarState: true,
                isChildGroupSaveLoading: false,
                snackbarMessage: response.data.message
              });
              this.snackbarTimeout();
            })
            .catch(error => {
              this.setState({
                snackbarState: true,
                isChildGroupSaveLoading: false,
                snackbarMessage: "unable to connect server"
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
                  {this.state.subGroups.length !== 0 ? (
                    <form onSubmit={this.saveChildGroup}>
                      <h4 style={{ color: "purple" }}>Add ChildGroup</h4>
                      <TextField
                        autoFocus={true}
                        label="CGN"
                        name="childGroupName"
                        onChange={this.inputChanged}
                        value={this.state.childGroupName}
                      />
                      <br />{"SG "}
                      <Select
                        value={this.state.subGroupName}
                        onChange={this.inputChanged}
                        name="subGroupName"
                      >
                        {this.state.subGroups.map(subGroup => (
                          <MenuItem key={subGroup._id} value={subGroup._id}>
                            {subGroup.subGroupName}
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
                      <Button type="submit" variant="contained" color="primary" disableFocusRipple={true} disableRipple={true} disabled={this.state.isChildGroupSaveLoading}> save {this.state.isChildGroupSaveLoading ? (
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

export default AddChildGroup;
