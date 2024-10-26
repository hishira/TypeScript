import { createReducer, on } from '@ngrx/store';
import { GetCurrentUserAction, SetCurrentUserAction } from './actions';

export const InitialCurrentUserState = {};
export const currentUserReducers = createReducer(
  InitialCurrentUserState,
  on(GetCurrentUserAction, (state) =>  state ),
  on(SetCurrentUserAction, (state, user) => user)
);
