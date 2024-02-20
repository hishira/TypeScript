import { inject, observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import FormComponent from "../../components/Form/index";
import { LocalLogin } from "../../components/LocalLogin";
import { LoginHook } from "../../hooks/login.hook";
import { LoginUtils } from "../../hooks/loginUtils.hook";
import { IGeneral } from "../../models/General";
import { Container, FormContainer } from "./component.styled";

type Prop = {
  store?: IGeneral;
};

const LoginPage = ({ store }: Prop): JSX.Element => {
  const history = useHistory();

  const {
    localLoginHandle,
    loginchange,
    passwordchange,
    loginClickHandle,
    redirectFunction,
  } = LoginUtils(history, store);
  LoginHook(history, store);
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
