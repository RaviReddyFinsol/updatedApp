import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

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
      groups: []
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true }, () => {
      axios
        .get("http://localhost:9003/api/groups", {
          params: { userID: this.props.match.params.token }
        })
        .then(response => {
          this.setState({ isLoading: false, groups: response.data.groups });
        })
        .catch(err => {
          this.setState({ isLoading: false });
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
      if (MIME_TYPE_MAP[file.mimetype]) {
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

  saveSubGroup = event => {
    event.preventDefault();
    if (
      this.state.subGroupName !== undefined ||
      this.state.subGroupName !== "" ||
      this.state.subGroupName.length !== 0
    ) {
      if (this.state.groupName !== "") {
        this.setState({ isLoading: true }, () => {
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
                isLoading: false
              });
              this.snackbarTimeout();
            })
            .catch(error => {
              this.setState({
                snackbarMessage: "unable to connect to server",
                snackbarState: true,
                isLoading: false
              });
              this.snackbarTimeout();
            });
        });
      } else {
        this.setState({
          snackbarMessage: "Please select any group",
          snackbarState: true,
          isLoading: false
        });
        this.snackbarTimeout();
      }
    } else {
      this.setState({
        snackbarMessage: "Please enter valid SubGroup name",
        snackbarState: true,
        isLoading: false
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
        {this.state.isLoading ? (
          <CircularProgress />
        ) : (
          <React.Fragment>
            {this.state.groups.length !== 0 ? (
              <form onSubmit={this.saveSubGroup}>
                <TextField
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
                <img src={this.state.imageURL} alt={""} />
                <br />
                <input
                  type="file"
                  onChange={this.fileUpdated}
                  accept="image/*"
                />
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
            ) : (
              <h3>{"No group exists.Please add group first"}</h3>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(AddSubGroup);
