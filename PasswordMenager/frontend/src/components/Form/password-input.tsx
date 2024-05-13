import { ValidatorForm } from "../ValidatorForm";
import { Validators } from "../ValidatorForm/validators";
import { InputChangeHandler } from "./login-input";

export const PasswordInputElement = ({
  inputChangeHandler,
  isSignUp,
  formErrors,
}: InputChangeHandler) => (
  <ValidatorForm
    validators={isSignUp ? [Validators.PasswordValidation] : []}
    formErrors={formErrors}
    label="input.label.password"
    inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
      inputChangeHandler(e.target.value)
    }
    inputplaceholder="*****"
    inputtype="password"
  />
);
