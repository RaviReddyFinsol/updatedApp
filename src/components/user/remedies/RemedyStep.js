import React,{ Component } from "react";
import TextField from "@material-ui/core/TextField";

export default class RemedyStep extends Component{
    render(){
        return(
            <div>
                <TextField />
                <input type="file" />
            </div>
        )
    }
}