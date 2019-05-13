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
            if (state.remedySteps.length !== 0) {
                let modifiedSteps = [...state.remedySteps];
                modifiedSteps.pop();
                return {
                    ...state,
                    stepCounter: state.stepCounter - 1,
                    remedySteps: modifiedSteps
                }
            }
            else {
                return {
                    ...state
                }
            }
        }

        case actionTypes.DESCRIPTION_UPDATED: {
            let modifiedSteps = [...state.remedySteps];
            let item = modifiedSteps.find(i => i.stepName === action.payload.stepName);
            item.description = action.payload.description;
            return {
                ...state,
                remedySteps: modifiedSteps
            }
        }
        case actionTypes.FILE_CHANGED: {

            let modifiedSteps = [...state.remedySteps];
            let item = modifiedSteps.find(i => i.stepName === action.payload.stepName);
            item.filePath = action.payload.filePath;

            return {
                ...state,
                remedySteps: modifiedSteps
            }
        }
        default: {
            return state;
        }
    }
}