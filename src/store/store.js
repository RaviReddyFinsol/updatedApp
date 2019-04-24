import { createStore } from "redux";
import authReducer from "./reducers/auth";
import loginDialogReducer from "./reducers/loginDialogReducer";
import { combineReducers } from "redux";

const store = createStore(
  combineReducers({
    auth: authReducer,
    dialog: loginDialogReducer
  })
);

export default store;
