import React,{ Component } from "react";
import TextField from "@material-ui/core/TextField";

export default class RemedyStep extends Component{
    render(){
        return(
            <React.Fragment>
                {"Step"}
                <TextField />
                <input type="file" />
            </React.Fragment>
        )
    }
}