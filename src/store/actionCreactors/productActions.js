import * as actionTypes from "../actionTypes";
import axois from "axios";

export function getProducts(token) {
  return function(dispatch) {
    return axois
      .get("http://localhost:9003/api/catogery/products", {
        params: { Id: token }
      })
      .then(response => {
        dispatch({ type: actionTypes.GET_PRODUCT, val: response.data });
      });
  };
}
