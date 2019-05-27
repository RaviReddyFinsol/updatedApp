import React, { Component } from "react";
import ViewChildGroup from './ViewChildGroup';

class ViewAllChildGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            childGroups: [],
            notification: "No Child Group exists,Please add one "
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                {this.state.groups.length !== 0 ? (this.state.childGroups.map(childGroup => <ViewChildGroup key={childGroup.id} imagePath={childGroup.imagePath} childGroupName={childGroup.childGroupName} subGroupName={childGroup.subGroupName} isEditable={group.isEditable} />)) : (<h2> {this.state.notification}</h2>)}
            </div>
        )
    }
}

export default ViewAllChildGroups;