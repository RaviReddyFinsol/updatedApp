import { createStore } from "redux";
import authReducer from "./reducers/auth";
import loginDialogReducer from "./reducers/loginDialogReducer";
import { combineReducers } from "redux";
import remedyStepReducer from './reducers/remedyStepReducer';

const store = createStore(
  combineReducers({
    auth: authReducer,
    dialog: loginDialogReducer,
    remedyStep:remedyStepReducer
  })
);

export default store;
