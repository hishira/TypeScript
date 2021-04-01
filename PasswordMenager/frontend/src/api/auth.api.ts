import {
  getUrl,
  fetchPostObjectWithToken,
  fetchPostObject,
  fetchGetObjectWithtoken,
} from "./config.api";

const login = async (userauth: UserAuth): Promise<Response> => {
  const url: string = getUrl("auth/login");
  return await fetch(url, fetchPostObject(userauth));
};

const signup = async (newuserauth: UserAuth): Promise<Response> => {
  const url: string = getUrl("auth/signup");
  return await fetch(url, fetchPostObject(newuserauth));
};
const refreshAccessToken = async (token: string): Promise<Response> => {
  const url: string = getUrl("auth/refresh");
  return await fetch(url, fetchGetObjectWithtoken(token));
};
export { login, signup };
