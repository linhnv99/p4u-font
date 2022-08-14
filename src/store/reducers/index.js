import { combineReducers } from "redux";
import authReducers from "./authReducers";
import userReducers from "./userReducers";

export const rootReducer = combineReducers({
  auth: authReducers,
  user: userReducers,
});
