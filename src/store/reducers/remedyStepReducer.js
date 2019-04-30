import * as actionTypes from '../actionTypes';

const initialState = {
    remedySteps: [],
    stepCounter: 1
}

export default function remedyStepReducer(state = initialState, action) {
    debugger;
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
            var modifiedSteps = [];
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
            return {
                ...state
            }
        }
        case actionTypes.FILE_CHANGED: {
            return {
                ...state
            }
        }
        default: {
            return state;
        }
    }
}