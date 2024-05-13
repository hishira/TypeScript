import { useState } from "react";
import { IGeneral } from "../models/General";
import { Auth } from "../utils/auth.utils";
import { SessionStorage } from "../utils/localstorage.utils";

const InfoMessage = (message: string) => ({
  open: true,
  type: "info",
  message: message,
});

export const LoginUtils = (history: { push: Function }, store?: IGeneral) => {
  const [infoLogin, setInfoLogin] = useState<UserAuth>({
    login: "",
    password: "",
    email: "",
  });
  if (store === undefined) throw new Error("Store is not defined");
  const passwordchange = (password: string): void => {
    setInfoLogin({ ...infoLogin, password: password });
  };

  const loginchange = (login: string): void => {
    setInfoLogin({ ...infoLogin, login: login });
  };

  const loginClickHandle = async (
    e: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    e.preventDefault();
    await loginHandler();
  };

  const loginSuccess = (response: LoginReponse): void => {
    !store?.IsLocal &&
      SessionStorage.getInstance().setLocalStorageToken(response.response);
    store?.setUserActive(true);
    history.push("/store");
  };

  const loginHandler = async () => {
    const response: LoginReponse = await Auth.getInstance().LoginUserHandle(
      infoLogin
    );
    const loginSucces = response?.status && !response?.response?.message;

    if (loginSucces) {
      loginSuccess(response);
    } else {
      store?.setPopUpinfo(
        InfoMessage(response?.response?.message ?? "Error no message")
      );
    }
  };

  const localLoginHandle = async (password: string) => {
    setInfoLogin({ login: "", password: password, email: "" });
    await loginHandler();
  };

  const redirectFunction = () => {
    history.push("/signup");
  };

  return {
    localLoginHandle,
    passwordchange,
    loginchange,
    loginClickHandle,
    redirectFunction,
    infoLogin,
  };
};
