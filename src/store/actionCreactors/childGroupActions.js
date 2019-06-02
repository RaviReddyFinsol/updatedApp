import * as actionTypes from "../actionTypes";
import axois from "axios";

export function getChildGroups(token) {
  return function(dispatch) {
    return axois
      .get("http://localhost:9003/api/catogery/childGroups", {
        params: { Id: token }
      })
      .then(response => {
        dispatch({ type: actionTypes.GET_CHILDGROUP, val: response.data });
      });
  };
}
