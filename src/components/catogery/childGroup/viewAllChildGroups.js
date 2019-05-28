import React, { Component } from "react";
import ViewChildGroup from './ViewChildGroup';
import {connect} from "react-redux";
import {getChildGroups} from '../../../store/actionCreators';

const mapStateToProps = state => {
    return{
        childGroups : state.childGroups.childGroups
    }
}

class ViewAllChildGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: "No Child Group exists,Please add one "
        }
    }

    componentDidMount() {
        this.props.getChildGroups();
    }

    render() {
        return (
            <div>
                {this.props.childGroups.length !== 0 ? (this.state.childGroups.map(childGroup => <ViewChildGroup key={childGroup.id} imagePath={childGroup.imagePath} childGroupName={childGroup.childGroupName} subGroupName={childGroup.subGroupName} isEditable={childGroup.isEditable} />)) : (<h2> {this.state.notification}</h2>)}
            </div>
        )
    }
}

export default connect(mapStateToProps,{getChildGroups})(ViewAllChildGroups);