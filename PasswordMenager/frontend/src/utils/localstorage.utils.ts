const getAccessToken = (): string => localStorage.getItem("accesstoken") || "";
const getRefreshToken = (): string =>
  localStorage.getItem("refreshtoken") || "";
const setLocalStorageToken = (token: AuthTokens): void => {
  localStorage.setItem("accesstoken", token.access_token);
  localStorage.setItem("refreshtoken", token.refresh_token);
};
const removeStorage = (): void => {
  localStorage.removeItem("accesstoken");
  localStorage.removeItem("refreshtoken");
};

export { getAccessToken, getRefreshToken, setLocalStorageToken, removeStorage };
