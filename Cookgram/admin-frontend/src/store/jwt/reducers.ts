import { createReducer, on } from '@ngrx/store';
import { JWTGetAction, JWTSetAccessToken, JWTSetAction } from './action';

export type JWTTokens = {
  accessToken: string;
  refreshToken: string;
};

export const InitialJwtTokenState: JWTTokens = {
  accessToken: '',
  refreshToken: '',
};

export const jwtReducers = createReducer(
  InitialJwtTokenState,
  on(JWTGetAction, (state) => ({ ...state })),
  on(JWTSetAction, (_, { accessToken, refreshToken }) => ({
    accessToken,
    refreshToken,
  })),
  on(JWTSetAccessToken, (state, { accessToken }) => ({ ...state, accessToken }))
);
