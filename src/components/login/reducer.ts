import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthStorage } from "../../lib"

export type TLoginReducerState={
    isLoggedIn:boolean;
}

const initialState:TLoginReducerState={
    isLoggedIn:AuthStorage.isLoggedIn
}

const loginSlice = createSlice({
    initialState:initialState,
    name:"login",
    reducers:{
        setLoginState(state,action:PayloadAction<boolean>){
            return {
                ...state,
                isLoggedIn:action.payload
            }
        }
    }
})

export const ActionLogin=loginSlice.actions;
export const ReducerLogin = loginSlice.reducer;