import { combineReducers } from "redux";
import { ThunkLogin } from "../components/login/thunk";
import { createReducerFromThunk } from "../lib";

export const ReducerApi = combineReducers({
    profile:createReducerFromThunk(ThunkLogin.GetProfile)
})