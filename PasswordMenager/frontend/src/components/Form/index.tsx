import React from "react";
import Button from "../../components/Button/index";
import FormElement from "../FormElement/";
import { Translation } from "../Translation";
import { Form, FormTitle, Link } from "./component.styled";
import { FormEmailField } from "./email-input";
import { PasswordInputElement } from "./password-input";

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

const ConfirmPasswordElement = ({
  confirmpassword,
  handlethis,
}: {
  confirmpassword: boolean;
  handlethis: (value: string) => void;
}) => {
  return confirmpassword ? (
    <FormElement
      label="input.label.confirmPassword"
      inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handlethis(e.target.value)
      }
      inputplaceholder="*****"
      inputtype="password"
    />
  ) : null;
};
export type InputChangeHandler = {
  inputChangeHandler: (value: string) => void;
};
const LoginInputElement = ({ inputChangeHandler }: InputChangeHandler) => (
  <FormElement
    label="input.label.login"
    inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
      inputChangeHandler(e.target.value)
    }
    inputplaceholder="login.input.label.placeholder"
    inputtype="text"
  />
);

const RedirectLinkElement = ({
  redirectFunction,
  redirectTranslation,
}: {
  redirectFunction: () => void;
  redirectTranslation: string;
}) => (
  <p>
    {Translation("page.login.or")}
    <Link onClick={() => redirectFunction()}>
      {Translation(redirectTranslation)}
    </Link>
  </p>
);
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
