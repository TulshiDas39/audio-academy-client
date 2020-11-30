import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EnumModals } from "../../../lib";

export interface IModalReducerState{
    openModals:EnumModals[]
}

const initialState:IModalReducerState={
    openModals:[],
}

const modalsSlice = createSlice({
    initialState:initialState,
    name:"modalsReducer",
    reducers:{
        showModal(state,action:PayloadAction<EnumModals>){
            return {
                ...state,
                openModals:[...state.openModals,action.payload]
            }
        },
        hideModal(state,action:PayloadAction<EnumModals>){
            return {
                ...state,
                openModals: state.openModals.filter(modal => modal !== action.payload)
            }
        }
    }
})

export const ActionsModal = modalsSlice.actions;
export const ReducersModals = modalsSlice.reducer;

