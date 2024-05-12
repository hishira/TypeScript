import React, { useState } from "react";
import Button from "../../components/Button/index";
import FormElement from "../FormElement/";
import { Translation } from "../Translation";
import { Form, FormTitle, Link } from "./component.styled";
import { FormEmailField } from "./email-input";
import { PasswordInputElement } from "./password-input";
import { LoginInputElement } from "./login-input";
import { ConfirmPasswordElement } from "./confirm-password-input";
import { RedirectLinkElement } from "./redirect-link-element";

interface Props {
  buttonmessage: string;
  buttonHandle: (e: React.MouseEvent<HTMLElement>) => void;
  firstinputhandle: (value: string) => void;
  secondinputhandle: (value: string) => void;
  secondactionastirng: string;
  redirectfunction: () => void;
  maintitle: string;
  confirmpassword?: boolean;
  confirmpasshandle?: (value: string) => void;
  isEmail?: boolean;
  emailSetHandle?: (value: string) => void;
  infoLogin?: UserAuth;
}

const FormComponent = ({
  buttonmessage,
  buttonHandle,
  firstinputhandle,
  secondinputhandle,
  secondactionastirng,
  redirectfunction,
  maintitle,
  confirmpassword,
  confirmpasshandle,
  isEmail,
  emailSetHandle,
  infoLogin,
}: Props): JSX.Element => {
  const [passwordErrors, setPasswordErrors] = useState<ErrorValue[]>([]);
  const [loginErrors, setLoginErrors] = useState<ErrorValue[]>([]);
  const handlethis = (value: string) => {
    if (confirmpasshandle) confirmpasshandle(value);
  };
  const checkErrorsAndPass = (e: React.MouseEvent<HTMLElement>) => {
    console.log(infoLogin);
    if (infoLogin !== undefined) {
      if (infoLogin.password === "") {
        setPasswordErrors([{ message: "Pasword is required" }]);
      }
      if (infoLogin.login === "") {
        setLoginErrors([{ message: "Login is required" }]);
      }
    } else {
      buttonHandle(e);
    }
  };
  const isEmailAvailable = isEmail && emailSetHandle;
  return (
    <Form>
      <FormTitle>{Translation(maintitle)}</FormTitle>
      <LoginInputElement
        formErrors={loginErrors}
        inputChangeHandler={firstinputhandle}
      />
      <FormEmailField
        isEmailAvailable={isEmailAvailable as boolean}
        emailSetHandle={emailSetHandle as any}
      />
      <PasswordInputElement
        formErrors={passwordErrors}
        inputChangeHandler={secondinputhandle}
        isSignUp={isEmail}
      />
      <ConfirmPasswordElement
        confirmpassword={confirmpassword as boolean}
        handlethis={handlethis}
      />
      <RedirectLinkElement
        redirectFunction={redirectfunction}
        redirectTranslation={secondactionastirng}
      />
      <Button
        onClick={checkErrorsAndPass}
        type="button"
        margintop={10}
        fullwidth
        color="whitesmoke"
        size="large"
      >
        {Translation(buttonmessage)}
      </Button>
    </Form>
  );
};

export default FormComponent;
