import {createStore} from "redux";
import authReducer from './auth';

var store = createStore(authReducer);
export default store;