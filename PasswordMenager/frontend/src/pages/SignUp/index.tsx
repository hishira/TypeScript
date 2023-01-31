import React, { useState } from "react";
import FormComponent from "../../components/Form/index";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../utils/auth.utils";
import { Container, FormContainer } from "./component.styled";
import { inject, observer } from "mobx-react";
import { IGeneral } from "../../models/General";

type RegisterInfo = {
  login: string;
  password: string;
  confirmpassword: string;
};

type Prop = {
  store: IGeneral;
};
const SignUp = ({ store }: Prop) => {
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

  const registerClickHandle = async (
    e: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    e.preventDefault();
    if (registerinfo.password.length < 6) {
      store.setPopUpinfo({
        open: true,
        message: "Password min length must be 6",
        type: "info",
      });
      return;
    }
    if (registerinfo.password !== registerinfo.confirmpassword) {
      store.setPopUpinfo({
        open: true,
        message: "Passwords must be the same",
        type: "info",
      });
      return;
    }
   registerUser({
      login: registerinfo.login,
      password: registerinfo.password,
    }).then((response)=>{
      if(!!response){
        store.setPopUpinfo({
          open: true,
          message: "User created",
          type: "success",
        })
      }
    })
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

export default inject("store")(observer(SignUp));
