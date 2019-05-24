import * as actionTypes from "../actionTypes";

const initialState = {
    productQtyTypes: []
};

export default function productQtyDetailsReducer(state=initialState,action){
    switch(action.type){
        case actionTypes.ADD_PRODUCT_QTY_DETAILS : {
            let newProductDetails = {
                id : state.productQtyTypes.length + 1,
                mrp : 0, sellPrice:0, discount:0, quantity:0, offer:"",maxQuantity:0
            };
            return{
                ...state,
                productQtyTypes: [...state.productQtyTypes,newProductDetails]
            }
        }

        case actionTypes.UPDATE_PRODUCT_QTY_DETAILS : {
            let updatedProducts = [...state.productQtyTypes]; 
            let updatedProduct = updatedProducts.find(item=>item.id === action.payload.id);
            switch(action.payload.fieldName){
                case "mrp": updatedProduct.mrp = action.payload.val;
                break;
                case "sellPrice" : 
                updatedProduct.sellPrice = action.payload.val;
                 break;
                case "discount" : 
                updatedProduct.discount = action.payload.val;
                 break;
                case "quantity" : 
                updatedProduct.quantity = action.payload.val;
                 break;
                case "maxQuantity" : 
                updatedProduct.maxQuantity = action.payload.val;
                 break;
                case "offer" : 
                updatedProduct.offer = action.payload.val;
                 break;
                default :                
                
            }
            return {
                ...state,
                productQtyTypes: updatedProducts
            }
        }
        
        case actionTypes.REMOVE_PRODUCT_QTY_DETAILS : {
            let newProductDetails = [];
            let newProductCount = 1;
            let productQtyLength = state.productQtyTypes.length;
            for(var i=0;i<productQtyLength;i++)
            {
                if(state.productQtyTypes[i].id !== action.val){
                    let product = {...state.productQtyTypes[i]};
                    product.id = newProductCount;
                    newProductCount++;
                    newProductDetails.push(product);
                }
            }
            return{
                ...state,
                productQtyTypes: newProductDetails
            }
        }
        
        default : {
            return state;
        }
    }
}