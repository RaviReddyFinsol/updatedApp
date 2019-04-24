import * as actionTypes from "../actionTypes";

const initialState = {
  isDialogOpened: false
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.OPEN_DIALOG: {
      return {
        ...state,
        isDialogOpened: true
      };
    }
    case actionTypes.CLOSE_DIALOG: {
      return {
        ...state,
        isDialogOpened: false
      };
    }
    default:
      return state;
  }
}
