import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';

class EditChildGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subGroups: [],
      selectedSubGroup: "",
      childGroupName: "",
      image: "",
      imageURL: "",
      isLoading: false,
      snackbarState: false,
      snackbarMessage: ""
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

  updateChildGroup = event => {
    event.preventDefault();
    this.setState({ isLoading: true }, () => {
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };

      const formData = new FormData();
      formData.append("subGroup", this.state.selectedSubGroup);
      formData.append("childGroupName", this.state.childGroupName);
      formData.append("image", this.state.image);

      axios
        .put("http://localhost:9003/api/childGroups", formData, {
          params: {
            userID: this.props.match.params.token,
            childGroupID: this.props.match.params.id
          }
        }, config)
        .then(response => {         
          this.setState({
            snackbarMessage: response.message,
            snackbarState: true,
            isLoading : false
          });      
          this.snackbarTimeout(); 
        })
        .catch(error => {
          this.setState({
            snackbarState: true,
            snackbarMessage: "Unable to connect to server",
            isLoading : false
          });
          this.snackbarTimeout();
        });
    });
  };

  componentDidMount() {
    this.setState({ isLoading: true }, () => {
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
        {
          this.state.subGroups.length !== 0 ? (
            <form onSubmit={this.saveChildGroup}>
              <TextField label="CGN" name="childGroupName" onChange={this.inputChanged} value={this.state.childGroupName} /><br />

              <Select value={this.state.selectedSubGroup} onChange={this.inputChanged} name="subGroupName">
                {this.state.subGroups.map(subGroup => ((<MenuItem value={subGroup._id} key={subGroup._id}> {subGroup.groupName} </MenuItem>)))}
              </Select>
              <br />
              <img src={this.state.imageURL} alt={""} />
              <br />
              <input type="file" onChange={this.fileUpdated} accept="image/*" /><br />
              <Button type="submit" onClick={this.updateChildGroup}>U</Button>
              <Snackbar message={this.state.snackbarMessage}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                open={this.state.snackbarState} />
            </form>
          ) : (<h3>{"No sub group exists.Please add sub group first"}</h3>)
        }
        </React.Fragment>
        )
      }
      </React.Fragment>
    );
  }
}

export default EditChildGroup;
