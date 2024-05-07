import React from "react";
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
}: Props): JSX.Element => {
  const handlethis = (value: string) => {
    if (confirmpasshandle) confirmpasshandle(value);
  };

  const isEmailAvailable = isEmail && emailSetHandle;
  return (
    <Form>
      <FormTitle>{Translation(maintitle)}</FormTitle>
      <LoginInputElement inputChangeHandler={firstinputhandle} />
      <FormEmailField
        isEmailAvailable={isEmailAvailable as boolean}
        emailSetHandle={emailSetHandle as any}
      />
      <PasswordInputElement inputChangeHandler={secondinputhandle} />
      <ConfirmPasswordElement
        confirmpassword={confirmpassword as boolean}
        handlethis={handlethis}
      />
      <RedirectLinkElement
        redirectFunction={redirectfunction}
        redirectTranslation={secondactionastirng}
      />
      <Button
        onClick={buttonHandle}
        type="submit"
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
