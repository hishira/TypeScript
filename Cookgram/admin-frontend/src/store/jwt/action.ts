import { createAction, props } from '@ngrx/store';
import { JWT } from './jwt.enum';

type JwtLogin = {
  accessToken: string;
  refreshToken: string;
};
export const JWTGetAction = createAction(JWT.GetToken);
export const JWTSetAction = createAction(JWT.SetToken, props<JwtLogin>());
export const JWTSetAccessToken = createAction(
  JWT.SetAccessToken,
  props<{ accessToken: string }>()
);
