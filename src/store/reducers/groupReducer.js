import * as actionTypes from "../actionTypes";

const initialState = {
  groups: [
    // {"_id" : 1, "groupName" : "one" , "isEditable" : true},{"_id" : 2, "groupName" : "two" , "isEditable" : false},{"_id" : 3, "groupName" : "three" , "isEditable" : true}
  ]
};

export default function groupReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_GROUP: {
      if (action.val.groups === undefined) {
        return {
          state
        };
      }
      return {
        ...state,
        groups: action.val.groups
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
