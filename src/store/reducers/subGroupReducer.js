import * as actionTypes from '../actionTypes';

const initialState = {
    subGroups : []
}

export default function subGroupReducer(state=initialState,action){
    switch(action.type){
        case actionTypes.ADD_SUBGROUP : {
            return state;
        }
        case actionTypes.UPDATE_SUBGROUP : {
            return state;
        }
        case actionTypes.DELETE_SUBGROUP : {
            return state;
        }
        default : {return state}
    }
    
}