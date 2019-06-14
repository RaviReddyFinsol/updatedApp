import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";

class EditSubGroup extends Component {
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
      isLoading: false
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
    this.setState({ isLoading: true }, () => {
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };

      const formData = new FormData();
      formData.append("subGroupName", this.state.subGroupName);
      formData.append("group", this.state.selectedGroup);
      formData.append("image", this.state.image);

      axios
        .put(
          "http://localhost:9003/api/subGroups",
          formData, {
            params: {
              userID: this.props.match.params.token,
              subGroupID: this.props.match.params.id
            }
          },
          config
        )
        .then(response => {
          this.setState({
            snackbarMessage: response.message,
            snackbarState: true
          });
          setTimeout(() => {
            this.setState({ snackbarState: false });
          }, 3000);
        })
        .catch(error => {
          this.setState({
            snackbarState: true,
            snackbarMessage: "Something went wrong.Try again after some time"
          });
          setTimeout(() => {
            this.setState({ snackbarState: false });
          }, 3000);
        });
    });
  }

  componentDidMount() {
    this.setState({ isLoading: true }, () => {
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
                  this.setState({
                    groups: groupResponse.data.groups,
                    selectedGroup: response.data.subGroup.group,
                    subGroupName: response.data.subGroup.subGroupName,
                    imageURL: response.data.subGroup.imagePath,
                    isLoading: false
                  });
                }
                else
                  this.setState({ snackbarMessage: response.message, snackbarState: true, isLoading: false });
                this.snackbarTimeout();
              })
              .catch(error => {
                this.setState({ snackbarMessage: "unable to connect server", snackbarState: true, isLoading: false });
                this.snackbarTimeout();
              });

          }
          else
            this.setState({ snackbarMessage: groupResponse.message, snackbarState: true, isLoading: false });
          this.snackbarTimeout();
        })
        .catch(err => {
          this.setState({ snackbarMessage: "unable to connect server", snackbarState: true, isLoading: false });
          this.snackbarTimeout();
        });
    })
  }

  snackbarTimeout = () => {
    setTimeout(() => {
      this.setState({ snackbarState: false });
    }, 3000);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <CircularProgress />
        ) : (
            <React.Fragment>
              {this.state.groups.length !== 0 ? (
                <form onSubmit={this.saveGroup}>
                  <TextField
                    label="GN"
                    name="subGroupName"
                    onChange={this.inputChanged}
                    value={this.state.subGroupName}
                  />
                  <br />
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
              ) : (
                  <h3>{"No group exists.Please add group first"}</h3>
                )}
            </React.Fragment>
          )}
      </React.Fragment>
    );
  }
}

export default EditSubGroup;
