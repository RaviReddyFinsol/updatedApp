import * as actionTypes from '../actionTypes';

const initialState = {
    products : []
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