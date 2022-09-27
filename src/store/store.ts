import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { RootReducer } from ".";

export const ReduxStore = configureStore({
    reducer: RootReducer,
    devTools: process.env.NODE_ENV === 'development',
});

export const useDispatchTyped = useDispatch<typeof ReduxStore.dispatch>;
