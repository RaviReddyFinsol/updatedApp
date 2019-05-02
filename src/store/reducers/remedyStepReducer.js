import * as actionTypes from '../actionTypes';

const initialState = {
    remedySteps: [],
    stepCounter: 1
}

export default function remedyStepReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_STEP: {
            return {
                ...state,
                stepCounter: state.stepCounter + 1,
                remedySteps: [...state.remedySteps, action.payload]
            }
        }
        case actionTypes.REMOVE_STEP: {
            let stepCount = 1;
            let modifiedSteps = [];
            for (let i = 0; i < state.remedySteps.length; i++) {
                let modifiedStep = state.remedySteps[i];
                if (modifiedStep.stepName !== action.val) {
                    modifiedStep.stepName = `Step${stepCount}`;
                    modifiedSteps.push(modifiedStep);
                    stepCount++;
                }
            }
            return {
                ...state,
                stepCounter: state.stepCounter - 1,
                remedySteps: modifiedSteps
            }
        }
        case actionTypes.DESCRIPTION_UPDATED: {
       
        let modifiedSteps = [...state.remedySteps];
        let item = modifiedSteps.find(i=>i.stepName === action.payload.stepName);
        item.description = action.payload.description;
       
            return {
                ...state,
                remedySteps:modifiedSteps
            }
        }
        case actionTypes.FILE_CHANGED: {

            let modifiedSteps = [...state.remedySteps];
            let item = modifiedSteps.find(i=>i.stepName === action.payload.stepName);
            item.filePath = action.payload.filePath;

            return {
                ...state,
                remedySteps:modifiedSteps
            }
        }
        default: {
            return state;
        }
    }
}