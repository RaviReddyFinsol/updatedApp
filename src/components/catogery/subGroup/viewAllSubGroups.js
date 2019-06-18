import React, { Component } from "react";
import ViewSubGroup from "./ViewSubGroup";
import { connect } from "react-redux";
import { getSubGroups } from "../../../store/actionCreactors/subGroupActions";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

class ViewAllSubGroups extends Component {
  isComponentUnmounted = false;
  constructor(props) {
    super(props);
    this.state = {
      subGroups: [],
      notification: "No Sub-Group exists.Please add one",
      isLoading: false,
      snackbarState: false,
      snackbarMessage: ""
    };
  }

  componentDidMount() {
    this.getSubGroups();
  }

  componentWillUnmount() {
    this.isComponentUnmounted = true;
  }

  getSubGroups = () => {
    this.setState({ isLoading: true }, () => {
      axios
        .get("http://localhost:9003/api/subGroups", {
          params: { userID: this.props.token }
        })
        .then(response => {
          this.setState({
            subGroups: response.data.subGroups,
            isLoading: false
          });
        })
        .catch(err => {
          this.setState({ isLoading: false });
        });
    });
  };

  deleteSubGroup = subGroupID => {
    this.setState({ isLoading: true }, () => {
      axios
        .delete("http://localhost:9003/api/subGroups", {
          params: { userID: this.props.token, subGroupID: subGroupID }
        })
        .then(response => {
          if (response.data.isSuccess)
            this.setState(
              { snackbarMessage: response.data.message, snackbarState: true },
              () => {
                this.snackbarTimeout();
                this.getSubGroups();
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
              this.state.subGroups.map(subGroup => (
                <ViewSubGroup
                  key={subGroup._id}
                  imagePath={subGroup.imagePath}
                  subGroupName={subGroup.subGroupName}
                  groupName={subGroup.groupName}
                  isEditable={subGroup.isEditable}
                  id={subGroup._id}
                  token={this.props.token}
                  delete={this.deleteSubGroup}
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

export default connect(
  mapStateToProps,
  { getSubGroups }
)(ViewAllSubGroups);
