import { combineReducers } from "redux";
import { ThunkContributorDashboard } from "../components/contributorDashboard/thunk";
import { ThunkLogin } from "../components/login/thunk";
import { createReducerFromThunk } from "../lib";

export const ReducerApi = combineReducers({
    getProfile:createReducerFromThunk(ThunkLogin.GetProfile),
    getAllClips:createReducerFromThunk(ThunkContributorDashboard.GetAllClip),
})