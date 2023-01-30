import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FormComponent from "../../components/Form/index";
import { IGeneral } from "../../models/General";
import { LoginUserHandle } from "../../utils/auth.utils";
import { setLocalStorageToken } from "../../utils/localstorage.utils";
import { Container, FormContainer } from "./component.styled";

type Prop = {
  store: IGeneral;
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
    const response: LoginReponse = await LoginUserHandle(infoLogin);
    console.log(response);
    //if (response?.status && response?.response !== null) {
    //  setLocalStorageToken(response.response);
    //  store.setUserActive(true);
    //  history.push("/store");
    //} else {
      store.setPopUpinfo({
        open: true,
        type: "info",
        message: "User do not exists",
      });
    //}
  };

  const redirectFunction = () => {
    history.push("/signup");
  };

  const history = useHistory();

  useEffect(() => {
    if (store.UserActivity) history.push("/store");
  }, [history, store.UserActivity]);
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
