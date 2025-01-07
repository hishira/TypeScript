import { createSelector } from '@ngrx/store';
import { MainStore } from '../main.store';
import { JWTTokens } from './reducers';

const JWtStoreFunction = (store: MainStore) => store.jwt;
const GetAccessToken = (jwtTokens: JWTTokens): string => jwtTokens.accessToken;
const GetRefreshToken = (jwtTokens: JWTTokens): string =>
  jwtTokens.refreshToken;

export const GetAccessTokenSelectors = createSelector(
  JWtStoreFunction,
  GetAccessToken
);
export const GetRefreshTokenSelectors = createSelector(
  JWtStoreFunction,
  GetRefreshToken
);
