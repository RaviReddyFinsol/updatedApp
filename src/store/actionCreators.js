import * as actionTypes from "./actionTypes";
import axois from "axios";

export function getGroups(token) {
  return function(dispatch) {
    return axois.get("http://localhost:9003/api/catogery/groups",{params:{Id:token}})
      .then(response =>  {
        dispatch({ type: actionTypes.GET_GROUP, val: response.data });
      });
  };
}

export function getSubGroups(token) {
  return function(dispatch) {
    return axois.get("http://localhost:9003/api/catogery/subGroups" ,{params:{Id:token}})
      .then(response => {
        dispatch({ type: actionTypes.GET_SUBGROUP, val: response.data });
      });
  };
}

export function getChildGroups(token) {
  return function(dispatch) {
    return axois.get("http://localhost:9003/api/catogery/childGroups" ,{params:{Id:token}})
    .then(response => {
        dispatch({ type: actionTypes.GET_CHILDGROUP, val: response.data });
      }
    );
  };
}

export function getProducts(token) {
  return function(dispatch) {
    return axois.get("http://localhost:9003/api/catogery/products" ,{params:{Id:token}})
      .then(response => {
        dispatch({ type: actionTypes.GET_PRODUCT, val: response.data });
      });
  };
}
