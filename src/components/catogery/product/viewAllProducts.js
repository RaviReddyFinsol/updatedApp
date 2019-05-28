import React, { Component } from "react";
import ViewProduct from './ViewProduct';
import {connect} from "react-redux";
import {getProducts} from '../../../store/actionCreators';

const mapStateToProps = (state) => {
    return{
        products : state.products.products
    }
}

class ViewAllProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: "No Product exists,Please add one "
        }
    }

    componentDidMount() {
        console.log("pro");
        this.props.getProducts();
    }

    render() {
        return (
            <div>
                {this.props.products.length !== 0 ? (this.props.products.map(product => <ViewProduct key={product.id} imagePath={product.imagePath} productName={product.productName} isEditable={product.isEditable} />)) : (<h2> {this.state.notification}</h2>)}
            </div>
        )
    }
}

export default connect(mapStateToProps,{getProducts})(ViewAllProducts);