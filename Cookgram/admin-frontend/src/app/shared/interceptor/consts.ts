export const REFRESHTOKENERROR = 'Cannot refresh token';

export const RefreshTokenError = new Error(REFRESHTOKENERROR);

export const ForbiddenRefreshUrlString: string[] = ['refresh-token', 'login'];

export const ServerErrorMessage = 'Server errror occur, please wait while';

export const BarearTokenString = (token: string): string => `Bearer ${token}`