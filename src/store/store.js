import { createStore } from "redux";
import authReducer from "./reducers/auth";
import loginDialogReducer from "./reducers/loginDialogReducer";
import { combineReducers } from "redux";
import remedyStepReducer from './reducers/remedyStepReducer';
import productQtyDetailsReducer from './reducers/productQtyDetailsReducer';
import productImageReducer from './reducers/productImageReducer';

const store = createStore(
  combineReducers({
    auth: authReducer,
    dialog: loginDialogReducer,
    remedyStep:remedyStepReducer,
    productQtyDetails:productQtyDetailsReducer,
    productImages:productImageReducer
  })
);

export default store;
