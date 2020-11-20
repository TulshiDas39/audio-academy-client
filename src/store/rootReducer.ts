import { combineReducers } from '@reduxjs/toolkit';
import {createSelectorHook} from 'react-redux';
import { ReducerLogin } from '../components/login/reducer';
import { AuthStorage } from '../lib';
import { ReducerApi } from './thunkReducer';

const AppReducer = combineReducers({
    login:ReducerLogin,
    api:ReducerApi,
});

const AppLogoutActionType = 'app/Logout';
export const ActionAppLogout = (): { type: string } => ({ type: AppLogoutActionType });

export const RootReducer: (...param: Parameters<typeof AppReducer>) => ReturnType<typeof AppReducer> = (state, action) => {
  if (action.type === AppLogoutActionType) {
    AuthStorage.clearLoginData();
    state = undefined;
  }
  return AppReducer(state, action);
}

export type ReduxState= ReturnType<typeof AppReducer>;

export const useSelectorTyped = createSelectorHook<ReduxState>();