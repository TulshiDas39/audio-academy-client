import { combineReducers } from '@reduxjs/toolkit';
import {useSelector,TypedUseSelectorHook} from 'react-redux';

const AppReducer = combineReducers({
    
});

const P1stonAppResetActionType = 'app/ResetAllState';
export const ActionP1stonAppReset = (): { type: string } => ({ type: P1stonAppResetActionType });

export const RootReducer: (...param: Parameters<typeof AppReducer>) => ReturnType<typeof AppReducer> = (state, action) => {
  if (action.type === P1stonAppResetActionType) {
    state = undefined;
  }
  return AppReducer(state, action);
}

// export type P1stonAppState = ReturnType<typeof P1stonReducer>;
export type ReduxState = ReturnType<typeof AppReducer>;

// export const useSelectorTyped: TypedUseSelectorHook<P1stonAppState> = useSelector;
