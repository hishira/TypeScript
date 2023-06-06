import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import FormComponent from "../../components/Form/index";
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
  });

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
    const response: any = await Auth.getInstance().LoginUserHandle(infoLogin);
    console.log(response);
    // TODO: Refactor
    if (
      response?.status &&
      !Object.keys(response?.response).includes("message")
    ) {
      SessionStorage.getInstance().setLocalStorageToken(response.response);
      store?.setUserActive(true);
      history.push("/store");
    } else {
      store?.setPopUpinfo({
        open: true,
        type: "info",
        message: response.response.message,
      });
    }
  };

  const redirectFunction = () => {
    history.push("/signup");
  };

  const history = useHistory();

  LoginHook(history, store);

  return (
    <Container>
      <FormContainer>
        <FormComponent
          firstinputhandle={loginchange}
          secondinputhandle={passwordchange}
          buttonmessage="Login"
          buttonHandle={loginClickHandle}
          secondactionastirng="create account"
          redirectfunction={redirectFunction}
          maintitle="Log in to account"
        />
      </FormContainer>
    </Container>
  );
};

export default inject("store")(observer(LoginPage));
