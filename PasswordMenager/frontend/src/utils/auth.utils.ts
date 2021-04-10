import { login, signup } from "../api/auth.api";

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

export { LoginUserHandle };
