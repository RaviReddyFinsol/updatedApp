import React, { Component } from "react";

class ProductImage extends Component {

    render() {
        return (
            <React.Fragment>
                <input type="file" accept="image/*" />
            </React.Fragment>
        );
    }

}

export default ProductImage;