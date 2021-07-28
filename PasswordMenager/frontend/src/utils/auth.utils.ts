import { login, signup, refreshAccessToken } from "../api/auth.api";
import { getRefreshToken, setAccessToken } from "./localstorage.utils";
const LoginUser = async (authinfo: UserAuth): Promise<AuthTokens> => {
  const response = await login(authinfo).then((resp: Response) => {
    if (resp.status !== 201) return { access_token: "", refresh_token: "" };
    return resp.json();
  });
  return response;
};

const LoginUserHandle = async (authobj: UserAuth): Promise<LoginReponse> => {
  const response: AuthTokens = await LoginUser(authobj);
  if (response.access_token !== "" && response.refresh_token !== "") {
    return { status: true, response: response };
  }
  return { status: false, response: null };
};
const registerUser = async(signupinfo: UserAuth): Promise<null | object | boolean>=>{
  const response:boolean | object = await signup(signupinfo).then((resp:Response)=>{
    if(resp.status === 200 || resp.status === 201) return resp.json();
    return false;
  })
  return response === false? null: response;
}
const refreshToken = async (): Promise<void> => {
  const refreshtoken: string = getRefreshToken();
  const response: number | AccessToken = await refreshAccessToken(
    refreshtoken
  ).then((resp: Response) => {
    if (resp.status === 201 || resp.status === 200) return resp.json();
    return 401;
  });
  if ((response as AccessToken).access_token !== "") {
    setAccessToken((response as AccessToken).access_token);
  }
};

export { LoginUserHandle, refreshToken, registerUser };
