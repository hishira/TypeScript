import React, { useState } from "react";
import Button from "../../components/Button/index";
import { Translation, TranslationFunction } from "../Translation";
import { Form, FormTitle } from "./component.styled";
import { ConfirmPasswordElement } from "./confirm-password-input";
import { FormEmailField } from "./email-input";
import { LoginInputElement } from "./login-input";
import { PasswordInputElement } from "./password-input";
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
  const passwordRequired = TranslationFunction(
    "validation.errors.passwordRequired"
  );
  const loginRequired = TranslationFunction("validation.errors.loginRequired");
  const handlethis = (value: string) => {
    if (confirmpasshandle) confirmpasshandle(value);
  };

  const checkErrorsAndPass = (e: React.MouseEvent<HTMLElement>) => {
    if (infoLogin !== undefined) {
      checkInfoLoginAndHandleError(infoLogin, e);
    } else {
      buttonHandle(e);
    }
  };

  const checkInfoLoginAndHandleError = (
    infoLogin: UserAuth,
    e: React.MouseEvent<HTMLElement>
  ): void => {
    let isError = false;
    if (infoLogin.password === "") {
      setPasswordErrors([{ message: passwordRequired }]);
      isError = true;
    }
    if (infoLogin.login === "") {
      setLoginErrors([{ message: loginRequired }]);
      isError = true;
    }
    if (!isError) {
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
