import React, { Component } from "react";
import ViewGroup from "./ViewGroup";
import { connect } from "react-redux";
import { getGroups } from "../../../store/actionCreators";
import Grid from '@material-ui/core/Grid';

const mapStateToProps = state => {
  return {
    groups: state.groups.groups
  };
};

class ViewAllGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [
        { "_id": "1", "imagePath": "", "groupName": "one", "isEditable": true },
        { "_id": "2", "imagePath": "", "groupName": "two", "isEditable": false },
        { "_id": "3", "imagePath": "", "groupName": "three", "isEditable": true },
      ],
      notification: "No Group exists,Please add one"
    };
  }

  componentDidMount() {
    // var token = {
    //   token: this.props.match.params.token
    // };
    // this.props.getGroups(token);
  }

  render() {
    return (
      <div>
        <Grid container spacing={8}>
          {this.state.groups.length !== 0 ? (
            this.state.groups.map(group => (
              <Grid xs={6} sm={4}>
                <ViewGroup
                  key={group._id}
                  imagePath={group.imagePath}
                  groupName={group.groupName}
                  isEditable={group.isEditable}
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
