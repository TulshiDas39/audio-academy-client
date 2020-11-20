import { combineReducers } from '@reduxjs/toolkit';
import {createSelectorHook} from 'react-redux';
import { ReducerLogin } from '../components/login/reducer';
import { AuthStorage } from '../lib';
import { ReducerApi } from './thunkReducer';

const AppReducer = combineReducers({
    login:ReducerLogin,
    api:ReducerApi,
});

const AppResetActionType = 'app/ResetAllState';
export const ActionAppReset = (): { type: string } => ({ type: AppResetActionType });

export const RootReducer: (...param: Parameters<typeof AppReducer>) => ReturnType<typeof AppReducer> = (state, action) => {
  if (action.type === AppResetActionType) {
    AuthStorage.clearLoginData();
    state = undefined;
  }
  return AppReducer(state, action);
}

export type ReduxState= ReturnType<typeof AppReducer>;

export const useSelectorTyped = createSelectorHook<ReduxState>();