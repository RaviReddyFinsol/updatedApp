import * as actionTypes from "../actionTypes";
import axois from "axios";

export function getSubGroups(token) {
  return function(dispatch) {
    return axois
      .get("http://localhost:9003/api/catogery/subGroups", {
        params: { Id: token }
      })
      .then(response => {
        dispatch({ type: actionTypes.GET_SUBGROUP, val: response.data });
      });
  };
}
