import * as actionTypes from "./actionTypes";

export function getGroups(token) {
  return function(dispatch) {
    return fetch("http://localhost:9003/api/catogery/groups", token)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: actionTypes.GET_GROUP, val: json });
      });
  };
}

export function getSubGroups() {
  return function(dispatch) {
    return fetch("http://localhost:9003/api/catogery/subGroups")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: actionTypes.GET_SUBGROUP, val: json });
      });
  };
}

export function getChildGroups() {
  return function(dispatch) {
    return fetch("http://localhost:9003/api/catogery/childGroups").then(
      response => {
        dispatch({ type: actionTypes.GET_CHILDGROUP, val: response.json() });
      }
    );
  };
}

export function getProducts() {
  return function(dispatch) {
    return fetch("http://localhost:9003/api/catogery/products")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: actionTypes.GET_PRODUCT, val: json });
      });
  };
}
