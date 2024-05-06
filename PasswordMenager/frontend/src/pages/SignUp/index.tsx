import React, { useState } from "react";
import FormComponent from "../../components/Form/index";
import { useHistory } from "react-router-dom";
import { Auth } from "../../utils/auth.utils";
import { Container, FormContainer } from "./component.styled";
import { inject, observer } from "mobx-react";
import { IGeneral } from "../../models/General";
import { TranslationFunction } from "../../components/Translation";

type RegisterInfo = {
  login: string;
  password: string;
  confirmpassword: string;
  email: string;
};

type Prop = {
  store?: IGeneral;
};
const SignUp = ({ store }: Prop) => {
  const [registerinfo, setregisterinfo] = useState<RegisterInfo>({
    login: "",
    password: "",
    confirmpassword: "",
    email: "",
  });
  const history = useHistory();

  const passwordchange = (password: string): void => {
    setregisterinfo({ ...registerinfo, password: password });
  };

  const loginchange = (login: string): void => {
    setregisterinfo({ ...registerinfo, login: login });
  };

  const emailChange = (email: string): void => {
    setregisterinfo({ ...registerinfo, email: email });
  };
  const confirmPasswordhandle = (password: string): void => {
    setregisterinfo({ ...registerinfo, confirmpassword: password });
  };
  const translation = {
    passwordLength: TranslationFunction(
      "page.signUp.popupMessage.passwordLength"
    ),
    samePassowrds: TranslationFunction("page.signUp.popupMessage.samePassword"),
    userCreated: TranslationFunction("page.signUp.popupMessage.userCreated"),
  };

  const registerClickHandle = async (
    e: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    e.preventDefault();
    if (registerinfo.password.length < 6) {
      store?.setPopUpinfo({
        open: true,
        message: translation.passwordLength,
        type: "info",
      });
      return;
    }
    if (registerinfo.password !== registerinfo.confirmpassword) {
      store?.setPopUpinfo({
        open: true,
        message: translation.samePassowrds,
        type: "info",
      });
      return;
    }
    Auth.getInstance()
      .registerUser({
        login: registerinfo.login,
        password: registerinfo.password,
        email: registerinfo.email,
      })
      .then((response) => {
        if (response) {
          store?.setPopUpinfo({
            open: true,
            message: translation.userCreated,
            type: "success",
          });
        }
      });
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
          buttonmessage="page.signUp.buttonMessage"
          buttonHandle={registerClickHandle}
          secondactionastirng="page.signUp.secondary"
          redirectfunction={redirectFunction}
          maintitle="page.signUp.mainTitle"
          confirmpassword
          confirmpasshandle={confirmPasswordhandle}
          isEmail={true}
          emailSetHandle={emailChange}
        />
      </FormContainer>
    </Container>
  );
};

export default inject("store")(observer(SignUp));
