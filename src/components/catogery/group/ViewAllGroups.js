import React,{Component} from "react";
import ViewGroup from './ViewGroup';

class ViewAllGroups extends Component
{
    constructor(props){
        super(props);
        this.state = {
            groups : [],
            notification : "No Group exists,Please add one "
        }
    }

componentDidMount(){

}

    render(){
        return(
            <div>
                {this.state.groups.length !== 0 ? (this.state.groups.map(group => <ViewGroup key={group.id} imagePath={group.imagePath} groupName={group.groupName} isEditable={group.isEditable}/>)) : (<h2> {this.state.notification}</h2>)}
            </div>
        )
    }
}

export default ViewAllGroups;