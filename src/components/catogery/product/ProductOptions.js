import React,{Component} from "react";
import { TextField,Button } from "@material-ui/core";

class ProductOptions extends Component {
    constructor(props){
        super(props);
        this.state = {
            mrp:0,
            discount:0,
            sellPrice:0,
            quantity:0
        };
    }
    
    inputChanged = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render(){
        return(
            <div>
                <TextField label="mrp" onChange={this.inputChanged}/> <br/>
                <TextField label="discount" onChange={this.inputChanged}/> <br/>
                <TextField label="sellPrice" onChange={this.inputChanged}/> <br/>
                <TextField label="quantity" onChange={this.inputChanged}/> <br/>
                <Button>Remove</Button>
            </div>
        );
    }

}

export default ProductOptions;