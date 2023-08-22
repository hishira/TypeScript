import { JwtSignOptions } from '@nestjs/jwt';

export const jwtConstants = {
  secret:
    'k2hkj42kj34h2klj34h2kjh34k2h342h342hl4l23j4kh34kh243b2mnb34JDDKHKdhkjasdhkjshDKDHKAJHSd',
  refresh: 'jk12j3kl12j3kljklKJASLDJASdklkl1j23lkj2kl3j2klj3kljdkljwdlas',
};

export const AccessTokenOptions: JwtSignOptions = {
  expiresIn: '2d',
  secret: jwtConstants.secret,
};

export const RefreshTokenOptions: JwtSignOptions = {
  expiresIn: '1d',
  secret: jwtConstants.refresh,
};

export const RefreshAccessTokenOptions: JwtSignOptions = {
  expiresIn: '180s',
  secret: jwtConstants.secret,
};
