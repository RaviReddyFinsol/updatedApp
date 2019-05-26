const initialState = {
  te: undefined
};

function auth2Reducer(state = initialState, action) {
  switch (action.type) {
    case "SET": {
      console.log("reducer ", action.val);
      return {
        ...state,
        te: action.val
      };
    }
    case "DEL": {
      return {
        ...state,
        te: undefined
      };
    }
    default:
      return state;
  }
}

export default auth2Reducer;
