import React, { useState } from "react";
import styled from "styled-components";
import FormComponent from "../../components/Form/index";
import { useHistory } from "react-router-dom";

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
  border: "2px solid green";
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

type RegisterInfo = {
  login: string;
  password: string;
  confirmpassword: string;
};

const SignUp = () => {
  const [registerinfo, setregisterinfo] = useState<RegisterInfo>({
    login: "",
    password: "",
    confirmpassword: "",
  });
  const history = useHistory();

  const passwordchange = (password: string): void => {
    setregisterinfo({ ...registerinfo, password: password });
  };

  const loginchange = (login: string): void => {
    setregisterinfo({ ...registerinfo, login: login });
  };

  const confirmPasswordhandle = (password: string): void => {
    setregisterinfo({ ...registerinfo, confirmpassword: password });
  };

  const registerClickHandle = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    console.log(registerinfo);
  };

  const redirectFunction = () => {
    history.push("/login");
  };
  return (
    <Container>
      <FormContainer>
        <FormComponent
          firstinputhandle={loginchange}
          secondinputhandle={passwordchange}
          buttonmessage="Sign Up"
          buttonHandle={registerClickHandle}
          secondactionastirng="Login"
          redirectfunction={redirectFunction}
          maintitle="Create account"
          confirmpassword
          confirmpasshandle={confirmPasswordhandle}
        />
      </FormContainer>
    </Container>
  );
};

export default SignUp;
