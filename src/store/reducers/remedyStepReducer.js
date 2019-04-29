//import remedyStepModel from '../../models/remedyStepModel';
import * as actionTypes from '../actionTypes';

const initialState = {
    remedySteps : [],
    stepCounter:1
}

export default function remedyStepReducer(state=initialState,action){
    debugger;
    switch(action.type){
        case actionTypes.ADD_STEP:{
            return{
                ...state,
                stepCounter:state.stepCounter+1,
                remedySteps:[...state.remedySteps,action.payload]
            }
        }
        case actionTypes.REMOVE_STEP:{
            return{
                ...state,
                stepCounter:state.stepCounter-1,
                remedySteps:state.remedySteps.filter(i=>i.StepName !== action.val)
            }
        }
        default:{
            return state;
        }
    }
}