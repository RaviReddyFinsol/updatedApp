import * as actionTypes from "../actionTypes";
import axois from "axios";

export function getGroups(token) {
  return function(dispatch) {
    return axois
      .get("http://localhost:9003/api/catogery/groups", {
        params: { token: token }
      })
      .then(response => {
        dispatch({ type: actionTypes.GET_GROUP, val: response.data });
      });
  };
}

//export function deleteGroup()
