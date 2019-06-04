import * as actionTypes from '../actionTypes';

const initialState = {
    products : [{"_id" : 1,"productName" : "onrfgvbhjnmk,lfghjk,ltgyhjkl;fghjke", "quantityDetails" : [{"mrp":100,"sellingPrice":80,"offer":"20%","quantity" : "1l"}]},{"_id" : 2,"productName" : "two","isEditable" : true, "quantityDetails" : [{"mrp":100,"sellingPrice":70,"offer":"30%","quantity" : "1kg"}]}]
}

export default function prductReducer(state=initialState,action){
    switch(action.type){
        case actionTypes.ADD_PRODUCT : {
            return state;
        }
        case actionTypes.UPDATE_PRODUCT : {
            return state;
        }
        case actionTypes.DELETE_PRODUCT : {
            return state;
        }
        default : {return state}
    }
    
}