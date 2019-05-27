import * as actionTypes from '../actionTypes';

const initialState = {
    childGroups : []
}

export default function childReducer(state=initialState,action){
    switch(action.type){
        case actionTypes.ADD_CHILDGROUP : {
            return state;
        }
        case actionTypes.UPDATE_CHILDGROUP : {
            return state;
        }
        case actionTypes.DELETE_CHILDGROUP : {
            return state;
        }
        default : {return state}
    }
    
}