import React, { Component } from "react";
import ViewGroup from './ViewGroup';
import {connect} from "react-redux";
import {getGroups} from '../../../store/actionCreators';

const mapStateToProps = (state) => {
    return{
        groups : state.groups.groups
    }
}

class ViewAllGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: "No Group exists,Please add one "
        }
    }

    componentDidMount() {
        this.props.getGroups();
    }

    render() {
        return (
            <div>
                {this.props.groups.length !== 0 ? (this.props.groups.map(group => <ViewGroup key={group.id} imagePath={group.imagePath} groupName={group.groupName} isEditable={group.isEditable} />)) : (<h2> {this.state.notification}</h2>)}
            </div>
        )
    }
}

export default connect(mapStateToProps,{getGroups})(ViewAllGroups);