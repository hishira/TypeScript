import FormElement from "../FormElement";
import { ValidatorForm } from "../ValidatorForm";

export type InputChangeHandler = {
  inputChangeHandler: (value: string) => void;
  isSignUp?: boolean;
  formErrors?: ErrorValue[];
};
export const LoginInputElement = ({
  inputChangeHandler,
  formErrors,
}: InputChangeHandler) => (
  <ValidatorForm
    formErrors={formErrors}
    validators={[]}
    label="input.label.login"
    inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
      inputChangeHandler(e.target.value)
    }
    inputplaceholder="login.input.label.placeholder"
    inputtype="text"
  />
);
