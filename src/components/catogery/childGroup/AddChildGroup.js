import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";

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
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true }, () => {
      axios
        .get("http://localhost:9003/api/subGroups", {
          params: { userID: this.props.match.params.token }
        })
        .then(response => {
          if (response.data.isSuccess)
            this.setState({
              subGroups: response.data.subGroups,
              isLoading: false
            });
          else {
            this.setState({
              isLoading: false,
              snackbarMessage: response.message,
              snackbarState: true
            });
            this.snackbarTimeout();
          }
        })
        .catch(err => {
          this.setState({
            isLoading: false,
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

  saveChildGroup = event => {
    event.preventDefault();
    if (
      this.state.childGroupName !== "" ||
      this.state.childGroupName !== undefined ||
      this.state.childGroupName.length !== 0
    ) {
      if (this.state.subGroupName !== "") {
        this.setState({ isLoading: true }, () => {
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
                isLoading: false,
                snackbarMessage: response.data.message
              });
              this.snackbarTimeout();
            })
            .catch(error => {
              this.setState({
                snackbarState: true,
                isLoading: false,
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
        {this.state.isLoading ? (
          <CircularProgress />
        ) : (
          <React.Fragment>
            {this.state.subGroups.length !== 0 ? (
              <form onSubmit={this.saveChildGroup}>
                <TextField
                  label="CGN"
                  name="childGroupName"
                  onChange={this.inputChanged}
                  value={this.state.childGroupName}
                />
                <br />

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
              <h3>{"No sub group exists.Please add sub group first"}</h3>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default AddChildGroup;
