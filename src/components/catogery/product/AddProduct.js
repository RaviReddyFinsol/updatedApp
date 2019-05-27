import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import axios from "axios";
import ProductOptions from "./ProductOptions";
import ProductImage from "./ProductImage";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actionTypes";
import Snackbar from '@material-ui/core/Snackbar';

const mapStateToProps = state => {
  return {
    productTypes: state.productQtyDetails.productQtyTypes,
    images: state.productImages.productImages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addProductQuantityType: () =>
      dispatch({ type: actionTypes.ADD_PRODUCT_QTY_DETAILS }),
    addProductImage: () => dispatch({ type: actionTypes.ADD_PRODUCT_IMAGE }),
    removeImage: () => dispatch({ type: actionTypes.REMOVE_PRODUCT_IMAGE })
  };
};

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      subGroup: "",
      childGroup: "",
      dietType: "",
      brand: "",
      details: "",
      ingridients: "",
      healthBenifits: "",
      validity: "",
      manufactureDetails: "",
      sellerDetails: ""
    };
  }

  inputChanged = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  saveProduct = event => {
    event.preventDefault();
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    let formData = new FormData();
    // formData.append("remedyName", this.state.remedyName);
    // formData.append("remedyType", this.state.remedyType);
    // formData.append("remedyForGender", this.state.remedyForGender);
    // formData.append("age", this.state.age);
    // formData.append("bodyPart", this.state.bodyPart);
    // formData.append("timeToUse", this.state.timeToUse);
    // formData.append("videoLink", this.state.videoLink);
    // formData.append("ingridients", this.state.remedyType);
    for (let step of this.props.steps) {
      //formData.append(`${step.stepName}_desc`, step.description);
      formData.append(`image`, step.filePath);
    }
    for (let ff of formData.entries()) {
      console.log(ff[0], ff[1]);
    }

    axios
      .post("http://localhost:9003/upload", formData, config)
      .then(response => {
        alert("The file is successfully uploaded");
      })
      .catch(error => {});

      this.setState({snackbarState:true});
      setTimeout(() => {      
        this.setState({snackbarState:false})},2000);
  };

  render() {
    return (
      <form onSubmit={this.saveProduct}>
        <TextField label="productName" value={this.state.productName} />
        <Select
          value={this.state.subGroup}
          onChange={this.inputChanged}
          name="subGroup"
        >
          <MenuItem value={""} />
        </Select>
        <Select
          value={this.state.childGroup}
          onChange={this.inputChanged}
          name="childGroup"
        >
          <MenuItem value={""} />
        </Select>
        <Select
          value={this.state.dietType}
          onChange={this.inputChanged}
          name="dietType"
        >
          <MenuItem value={""} />
          <MenuItem value={"veg"}>V</MenuItem>
          <MenuItem value={"non-veg"}>NV</MenuItem>
        </Select>
        <br />
        {this.props.productTypes
          ? this.props.productTypes.map(item => (
              <ProductOptions
                key={item.id}
                mrp={item.mrp}
                discount={item.discount}
                sellPrice={item.sellPrice}
                quantity={item.quantity}
                offer={item.offer}
                maxQuantity={item.maxQuantity}
                id={item.id}
              />
            ))
          : "Click Add"}
        <br />
        <Button onClick={this.props.addProductQuantityType}>
          Add Price & Quantity
        </Button>{" "}
        <br />
        <TextField
          label="Brand"
          name="brand"
          onChange={this.inputChanged}
          value={this.state.brand}
        />
        <TextField
          label="Details"
          name="details"
          onChange={this.inputChanged}
          value={this.state.details}
        />
        <TextField
          label="Ingredients"
          name="ingridients"
          onChange={this.inputChanged}
          value={this.state.ingridients}
        />
        <TextField
          label="Validity"
          name="validity"
          onChange={this.inputChanged}
          value={this.state.validity}
        />
        <TextField
          label="Manufacture Details"
          name="manufactureDetails"
          onChange={this.inputChanged}
          value={this.state.manufactureDetails}
        />
        <TextField
          label="Seller Details"
          name="sellerDetails"
          onChange={this.inputChanged}
          value={this.state.sellerDetails}
        />
        <br />
        {this.props.images
          ? this.props.images.map(item => <ProductImage key={item.id} />)
          : "Click Add for Image"}
        <br />
        <Button onClick={this.props.addProductImage}>Add Image</Button>
        <Button onClick={this.props.removeImage}>Remove</Button>
        <br />
        <Button type="submit">Save</Button>
        <Snackbar message={"snack demo"} 
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={this.state.snackbarState} />
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProduct);
