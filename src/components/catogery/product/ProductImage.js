import React,{Component} from "react";

class ProductImage extends Component {
  
    render(){
        return(
            <input type="file"  accept="image/*" />
        );
    }

}

export default ProductImage;