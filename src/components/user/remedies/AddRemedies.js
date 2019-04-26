import React,{Component} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//import FormHelperText from '@material-ui/core/FormHelperText';
//import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import RemedyStep from './RemedyStep';

export default class AddRemedies extends Component{
    
    componentDidMount(){
        console.log("add rem : ");
    }

    render(){
        return(
            <form>
                 <TextField label="Name"/>  {" Type"} 
                 <Select>
            <MenuItem>H</MenuItem>
            <MenuItem>B</MenuItem>
          </Select> {" Type"} 
          <Select>
            <MenuItem>B</MenuItem>
            <MenuItem>F</MenuItem>
            <MenuItem>M</MenuItem>
          </Select>
          <TextField label = "Age" />
          <TextField label = "Part" />
          <TextField label = "Time" />
          <TextField label = "Video link" />
          <TextField label = "Ingridients" />
          <br />
          <RemedyStep />
          <br/>
          <Button >Save</Button>
                 <br /> 
            </form>
        );
    }

}