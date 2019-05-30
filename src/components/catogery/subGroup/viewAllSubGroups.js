import React, { Component } from "react";
import ViewSubGroup from "./ViewSubGroup";
import { connect } from "react-redux";
import { getSubGroups } from "../../../store/actionCreators";

const mapStateToProps = state => {
  return {
    subGroups: state.subGroups.subGroups
  };
};

class ViewAllSubGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: "No Sub-Group exists,Please add one"
    };
  }

  componentDidMount() {
    //this.props.getSubGroups();
  }

  render() {
    return (
      <div>
        {this.props.subGroups.length !== 0 ? (
          this.props.subGroups.map(subGroup => (
            <ViewSubGroup
              key={subGroup.id}
              imagePath={subGroup.imagePath}
              subGroupName={subGroup.subGroupName}
              groupName={subGroup.groupName}
              isEditable={subGroup.isEditable}
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
