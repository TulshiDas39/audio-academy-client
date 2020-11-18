import { AsyncThunk, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { IThunkState } from "../types";

const initialState:IThunkState={
    isBusy:false,
    version:0,
}

export function createReducerFromThunk<Returned>(thunk:AsyncThunk<Returned,any,any>){
    return createReducer(initialState,builder=>{
        builder.addCase(thunk.pending,(state)=>{
            return {...state,isBusy:true}
        })
        builder.addCase(thunk.fulfilled,(state)=>{
            return {...state,isBusy:false,version:state.version+1}
        })
    })
}
