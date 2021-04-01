import { login, signup } from "../api/auth.api";

const LoginUser = async (authinfo: UserAuth): Promise<AuthTokens> => {
  const response = await login(authinfo).then((resp: Response) => {
    if (resp.status !== 200) return { access_token:"",refresh_token:"" };
    return resp.json();
  });
  return response;
};

const LoginUserHandle = async (authobj:UserAuth):Promise<boolean>=>{
    const response = await LoginUser(authobj);
    if(response.access_token !== "" && response.refresh_token !== ""){
        
        return true;
    }
    return false

} 
