import React,{Component} from "react";
import { TextField,Button } from "@material-ui/core";
import {connect} from "react-redux";
import * as actionTypes from '../../../store/actionTypes';

const mapDispatchToProps = dispatch => {
    return{
        updateQtyDetails : (ID,name,value) => dispatch({type:actionTypes.UPDATE_PRODUCT_QTY_DETAILS,payload:{id:ID,fieldName:name,val:value}}),
        removeProductQtyDetails : (ID) => dispatch({type:actionTypes.REMOVE_PRODUCT_QTY_DETAILS,val:ID})
    }
}

class ProductOptions extends Component {      
 
    inputChanged = (event) => {      
        this.props.updateQtyDetails(this.props.id,event.target.name,event.target.value)
    }
    
    render(){        
        //const {id} = this.props.productQtyDetails;
        return(
            <div>
                <TextField label="MRP" name="mrp" onChange={this.inputChanged} value={this.props.mrp}/> <br/>
                <TextField label="Discount" name="discount" onChange={this.inputChanged} value={this.props.discount}/> <br/>
                <TextField label="Sell Price" name="sellPrice" onChange={this.inputChanged} value={this.props.sellPrice}/> <br/>
                <TextField label="Quantity" name="quantity" onChange={this.inputChanged} value={this.props.quantity}/> <br/>
                <TextField label="Offer" name="offer" onChange={this.inputChanged} value={this.props.offer}/> <br/>
                <TextField label="Total Quantity" name="maxQuantity" onChange={this.inputChanged} value={this.props.maxQuantity}/> <br/>
                <Button onClick={() => this.props.removeProductQtyDetails(this.props.id)}>Remove</Button>
            </div>
        );
    }

}

export default connect(null,mapDispatchToProps)(ProductOptions);