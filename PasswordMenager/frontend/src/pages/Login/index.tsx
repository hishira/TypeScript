import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import FormComponent from "../../components/Form/index";
import { LocalLogin } from "../../components/LocalLogin";
import { LoginHook } from "../../hooks/login.hook";
import { IGeneral } from "../../models/General";
import { Auth } from "../../utils/auth.utils";
import { SessionStorage } from "../../utils/localstorage.utils";
import { Container, FormContainer } from "./component.styled";

type Prop = {
  store?: IGeneral;
};
const LoginPage = ({ store }: Prop): JSX.Element => {
  const [infoLogin, setInfoLogin] = useState<UserAuth>({
    login: "",
    password: "",
    email: "",
  });

  const passwordchange = (password: string): void => {
    setInfoLogin({ ...infoLogin, password: password });
  };

  const loginchange = (login: string): void => {
    setInfoLogin({ ...infoLogin, login: login });
  };

  const InfoMessage = (message: string) => ({
    open: true,
    type: "info",
    message: message,
  });

  const loginSuccess = (response: LoginReponse): void => {
    !store?.IsLocal &&
      SessionStorage.getInstance().setLocalStorageToken(response.response);
    store?.setUserActive(true);
    history.push("/store");
  };
  const loginClickHandle = async (
    e: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    e.preventDefault();
    await loginHandler();
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
  const redirectFunction = () => {
    history.push("/signup");
  };

  const history = useHistory();

  LoginHook(history, store);

  const localLoginHandle = async (password: string) => {
    setInfoLogin({ login: "", password: password, email: "" });
    await loginHandler();
  };
  return (
    <Container>
      {store?.IsLocal ? (
        <LocalLogin loginButtonhandle={localLoginHandle} />
      ) : (
        <FormContainer>
          <FormComponent
            firstinputhandle={loginchange}
            secondinputhandle={passwordchange}
            buttonmessage="page.login.button.text"
            buttonHandle={loginClickHandle}
            secondactionastirng="page.login.secondaryString"
            redirectfunction={redirectFunction}
            maintitle="page.login.mainTitle"
          />
        </FormContainer>
      )}
    </Container>
  );
};

export default inject("store")(observer(LoginPage));
