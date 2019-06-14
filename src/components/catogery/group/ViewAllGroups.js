import React, { Component } from "react";
import ViewGroup from "./ViewGroup";
import { connect } from "react-redux";
import { getGroups } from "../../../store/actionCreactors/groupActions";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    groups: state.groups.groups
  };
};

class ViewAllGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      groups: [],
      notification: "No Group exists,Please add one",
      snackbarState : false,
      snackbarMessage : "",
    };
  }

  componentDidMount() {
    this.getGroups();
  }

getGroups = () => {
  this.setState({ isLoading: true }, () => {
    axios
      .get("http://localhost:9003/api/groups/", {
        params: { userID: this.props.token }
      })
      .then(response => {
        if (response.data.isSuccess)
          this.setState({ groups: response.data.groups, isLoading: false });
        else this.setState({ isLoading: false });
      })
      .catch(err => {
        this.setState({ isLoading: false });
      });
  });
}

deleteGroup = groupID => {
  this.setState({isLoading : true}, () => {
  axios
  .delete("http://localhost:9003/api/groups", {
    params: { userID: this.props.token, groupID: groupID }
  })
  .then(response => {
    if(response.data.isSuccess)
      this.setState({snackbarMessage : response.data.message, snackbarState: true},() => {
        this.snackbarTimeout();
        this.getGroups();
      })
      else
      {
        this.setState({snackbarMessage : response.data.message, snackbarState: true,isLoading : false})
        this.snackbarTimeout();
      }
  }).catch(err=> {
    this.setState({snackbarMessage : "unable to connect to server", snackbarState: true,isLoading : false})
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
      <div>
        {this.state.isLoading ? (
          <CircularProgress />
        ) : (
            <Grid container spacing={8}>
              {this.state.groups.length !== 0 ? (
                this.state.groups.map(group => (
                  <Grid item xs={6} sm={4} key={group._id}>
                    <ViewGroup
                      key={group._id}
                      imagePath={group.imagePath}
                      groupName={group.groupName}
                      isEditable={group.isEditable}
                      id={group._id}
                      token={this.props.token} 
                      delete = {this.deleteGroup}                    
                    />
                  </Grid>
                ))
              ) : (
                  <h2> {this.state.notification}</h2>
                )}
            </Grid>
          )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { getGroups }
)(ViewAllGroups);
