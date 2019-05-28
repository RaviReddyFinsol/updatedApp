import { createStore, applyMiddleware } from "redux";
import authReducer from "./reducers/auth";
import loginDialogReducer from "./reducers/loginDialogReducer";
import { combineReducers } from "redux";
import remedyStepReducer from './reducers/remedyStepReducer';
import productQtyDetailsReducer from './reducers/productQtyDetailsReducer';
import productImageReducer from './reducers/productImageReducer';
import productReducer from './reducers/productReducer';
import groupReducer from './reducers/groupReducer';
import subGroupReducer from './reducers/subGroupReducer';
import childGroupReducer from './reducers/childGroupReducer';
import thunk from "redux-thunk";

const store = createStore(
  combineReducers({
    auth : authReducer,
    dialog : loginDialogReducer,
    remedyStep : remedyStepReducer,
    productQtyDetails : productQtyDetailsReducer,
    productImages : productImageReducer,
    products : productReducer,
    groups : groupReducer,
    subGroups : subGroupReducer,
    childGroups : childGroupReducer
  }), applyMiddleware(thunk)
);

export default store;
