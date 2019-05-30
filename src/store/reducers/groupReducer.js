import * as actionTypes from "../actionTypes";

const initialState = {
  groups: []
};

export default function groupReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_GROUP: {
      return {
        ...state,
        groups: action.val.data
      };
    }
    case actionTypes.ADD_GROUP: {
      return state;
    }
    case actionTypes.UPDATE_GROUP: {
      return state;
    }
    case actionTypes.DELETE_GROUP: {
      return state;
    }
    default: {
      return state;
    }
  }
}
