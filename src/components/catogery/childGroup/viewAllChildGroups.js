import React, { Component } from "react";
import ViewChildGroup from "./ViewChildGroup";
import { connect } from "react-redux";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

class ViewAllChildGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childGroups: [],
      notification: "No Child Group exists.Please add one",
      isLoading: false,
      snackbarState: false,
      snackbarMessage: ""
    };
  }

  componentDidMount() {
    this.getChildGroups();
  }

  getChildGroups = () => {
    this.setState({ isLoading: true }, () => {
      axios
        .get("http://localhost:9003/api/childGroups", {
          params: { userID: this.props.token }
        })
        .then(response => {
          this.setState({
            childGroups: response.data.childGroups,
            isLoading: false
          });
        })
        .catch(err => {
          this.setState({ isLoading: false });
        });
    });
  };

  deleteChildGroup = childGroupID => {
    this.setState({ isLoading: true }, () => {
      axios
        .delete("http://localhost:9003/api/childGroups", {
          params: { userID: this.props.token, childGroupID: childGroupID }
        })
        .then(response => {
          if (response.data.isSuccess)
            this.setState(
              { snackbarMessage: response.data.message, snackbarState: true },
              () => {
                this.snackbarTimeout();
                this.getChildGroups();
              }
            );
          else {
            this.setState({
              snackbarMessage: response.data.message,
              snackbarState: true,
              isLoading: false
            });
            this.snackbarTimeout();
          }
        })
        .catch(err => {
          this.setState({
            snackbarMessage: "unable to connect to server",
            snackbarState: true,
            isLoading: false
          });
          this.snackbarTimeout();
        });
    });
  };

  snackbarTimeout = () => {
    setTimeout(() => {
      this.setState({ snackbarState: false });
    }, 3000);
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <CircularProgress />
        ) : (
          <React.Fragment>
            {this.state.childGroups.length !== 0 ? (
              this.state.childGroups.map(childGroup => (
                <ViewChildGroup
                  key={childGroup._id}
                  imagePath={childGroup.imagePath}
                  childGroupName={childGroup.childGroupName}
                  subGroupName={childGroup.subGroupName}
                  isEditable={childGroup.isEditable}
                  id={childGroup._id}
                  token={this.props.token}
                  delete={this.deleteChildGroup}
                />
              ))
            ) : (
              <h2> {this.state.notification}</h2>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(ViewAllChildGroups);
