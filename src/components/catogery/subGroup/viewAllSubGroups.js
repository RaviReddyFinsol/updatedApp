import React, { Component } from "react";
import ViewSubGroup from "./ViewSubGroup";
import { connect } from "react-redux";
import { getSubGroups } from "../../../store/actionCreactors/subGroupActions";
import axios from "axios";

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

class ViewAllSubGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subGroups: [],
      notification: "No Sub-Group exists,Please add one"
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:9003/api/subGroups/subGroups", {
        params: { token: this.props.token }
      })
      .then(response => {
        this.setState({ subGroups: response.data.subGroups });
      });
  }

  render() {
    return (
      <div>
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
            />
          ))
        ) : (
          <h2> {this.state.notification}</h2>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { getSubGroups }
)(ViewAllSubGroups);
