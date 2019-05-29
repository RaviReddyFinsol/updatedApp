import React, { Component } from "react";
import ViewGroup from "./ViewGroup";
import { connect } from "react-redux";
import { getGroups } from "../../../store/actionCreators";

const mapStateToProps = state => {
  return {
    groups: state.groups.groups
  };
};

class ViewAllGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups : [{"id" : "2","groupName" : "one","isEditable" : "true"},
      {"id" : "3","groupName" : "two","isEditable" : "false"},
      {"id" : "4","groupName" : "three","isEditable" : "true"}],
      notification: "No Group exists,Please add one"
    };
  }

  componentDidMount() {
    // var token = {
    //   token: this.props.match.params.token
    // };
    //this.props.getGroups(token);
  }

  render() {
    console.log(this.state.groups);
    return (
      <div>
        {this.state.groups.length !== 0 ? (
          this.state.groups.map(group => (
            <ViewGroup
              key={group.id}
              imagePath={group.imagePath}
              groupName={group.groupName}
              isEditable={group.isEditable}
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
  { getGroups }
)(ViewAllGroups);
