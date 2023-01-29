import React, { useState, useEffect } from "react";
import FormComponent from "../../components/Form/index";
import { useHistory } from "react-router-dom";
import { LoginUserHandle } from "../../utils/auth.utils";
import { setLocalStorageToken } from "../../utils/localstorage.utils";
import { inject, observer } from "mobx-react";
import { IGeneral } from "../../models/General";
import { Container, FormContainer } from "./component.styled";
import PopUpElement from "../../components/Popup";

type Prop = {
  store: IGeneral,
}
const LoginPage = ({store}:Prop): JSX.Element => {
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
    console.log(response)
    if (response.status && response.response !== null) {
      setLocalStorageToken(response.response);
      store.setUserActive(true);
      history.push("/store");
    } else {
      
    }
  };

  const redirectFunction = () => {
    history.push("/signup");
  };

  const history = useHistory();

  useEffect(()=>{
    if(store.UserActivity)
      history.push("/store");
  },[history, store.UserActivity])
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
      <PopUpElement type='error' message="User does not exist" ></PopUpElement>
    </Container>
  );
};

export default inject("store")(observer(LoginPage));
