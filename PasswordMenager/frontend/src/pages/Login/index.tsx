import React, { useState } from "react";
import styled from "styled-components";
import FormComponent from "../../components/Form/index";
import {useHistory} from "react-router-dom";


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

interface LoginInfo {
  login: string;
  password: string;
}
const LoginPage = (): JSX.Element => {
  const [infoLogin, setInfoLogin] = useState<LoginInfo>({
    login: "",
    password: "",
  });
  
  const passwordchange = (password: string): void => {
    setInfoLogin({ ...infoLogin, password: password });
  };
  
  const loginchange = (login: string): void => {
    setInfoLogin({ ...infoLogin, login: login });
  };
  
  const loginClickHandle = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(infoLogin);
    history.push("/store");
  };
  
  const redirectFunction = ()=>{
    history.push("/signup")
  }
  
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

export default LoginPage;
