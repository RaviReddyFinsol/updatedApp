import React, { Component } from "react";
import ViewProduct from './ViewProduct';

class ViewAllProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            notification: "No Group exists,Please add one "
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                {this.state.products.length !== 0 ? (this.state.products.map(product => <ViewProduct key={product.id} imagePath={product.imagePath} productName={product.productName} isEditable={product.isEditable} />)) : (<h2> {this.state.notification}</h2>)}
            </div>
        )
    }
}

export default ViewAllProducts;