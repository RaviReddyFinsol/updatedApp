import * as actionTypes from "../actionTypes";

const initialState = {
  token: undefined
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.USER_LOGIN: {
      return {
        ...state,
        token: action.val
      };
    }
    case actionTypes.USER_LOGOUT: {
      return {
        ...state,
        token: undefined
      };
    }
    default:
      return state;
  }
}
