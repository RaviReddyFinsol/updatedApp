import React, { Component } from "react";
import ViewProduct from "./ViewProduct";
import { connect } from "react-redux";
import { getProducts } from "../../../store/actionCreactors/productActions";

const mapStateToProps = state => {
  return {
    products: state.products.products
  };
};

class ViewAllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: "No Product exists,Please add one "
    };
  }

  componentDidMount() {
    //this.props.getProducts();
  }

  render() {
    return (
      <div>
        {this.props.products.length !== 0 ? (
          this.props.products.map(product => (
            <ViewProduct
              key={product._id}
              imagePath={product.imagePath}
              productName={product.productName}
              isEditable={product.isEditable}
              quantityDetails={product.quantityDetails}
              id={product._id}
            />
          ))
        ) : (
          <h2> {this.state.notification}</h2>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { getProducts }
)(ViewAllProducts);
