import React, { Component } from "react";
import ViewSubGroup from './ViewSubGroup';

class ViewAllSubGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subGroups: [],
            notification: "No Group exists,Please add one "
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                {this.state.subGroups.length !== 0 ? (this.state.subGroups.map(subGroup => <ViewSubGroup key={subGroup.id} imagePath={subGroup.imagePath} subGroupName={subGroup.subGroupName} groupName={subGroup.groupName} isEditable={subGroup.isEditable} />)) : (<h2> {this.state.notification}</h2>)}
            </div>
        )
    }
}

export default ViewAllSubGroups;