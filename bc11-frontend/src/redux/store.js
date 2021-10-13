import {createStore, combineReducers } from "redux";
import {userReducer} from "./reducers/userReducer";

const initialState = {};

const store = createStore(
  combineReducers({ user: userReducer}),
  initialState,
);
export default store;
