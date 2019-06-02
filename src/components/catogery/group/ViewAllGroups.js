import React, { Component } from "react";
import ViewGroup from "./ViewGroup";
import { connect } from "react-redux";
import { getGroups } from "../../../store/actionCreactors/groupActions";
import Grid from "@material-ui/core/Grid";

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
      notification: "No Group exists,Please add one"
    };
  }

  componentDidMount() {
    this.props.getGroups(this.props.token);
  }

  render() {
    return (
      <div>
        <Grid container spacing={8}>
          {this.props.groups.length !== 0 ? (
            this.props.groups.map(group => (
              <Grid item xs={6} sm={4} key={group._id}>
                <ViewGroup
                  key={group._id}
                  imagePath={group.imagePath}
                  groupName={group.groupName}
                  isEditable={group.isEditable}
                  id={group._id}
                  token={this.props.token}
                />
              </Grid>
            ))
          ) : (
            <h2> {this.state.notification}</h2>
          )}
        </Grid>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { getGroups }
)(ViewAllGroups);
