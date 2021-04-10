import React, { useState } from "react";
import styled from "styled-components";
import FormComponent from "../../components/Form/index";
import { useHistory } from "react-router-dom";
import { LoginUserHandle } from "../../utils/auth.utils";
import { setLocalStorageToken } from "../../utils/localstorage.utils";
import { inject, observer } from "mobx-react";
import { IGeneral } from "../../models/General";
const Container = styled.div`
  display: flex;
  justify-content: center;
  border: 2px solid red;
`;

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  width: 50%;
  padding: 10px;
  margin-top: 5rem;
  @media (max-width: 1200px) {
    width: 70%;
  }
  @media (max-width: 900px) {
    width: 70%;
  }
  @media (max-width: 489px) {
    width: 100%;
  }
`;
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
    console.log(infoLogin);
    const response: LoginReponse = await LoginUserHandle(infoLogin);
    if (response.status && response.response !== null) {
      console.log(response.response?.access_token);
      console.log(response.response?.refresh_token);
      setLocalStorageToken(response.response);
      console.log(store.UserActivity)
    }
  };

  const redirectFunction = () => {
    history.push("/signup");
  };

  const history = useHistory();

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
