import { InputChangeHandler } from ".";
import { ValidatorForm } from "../ValidatorForm";
import { Validators } from "../ValidatorForm/validators";

export const PasswordInputElement = ({
  inputChangeHandler,
}: InputChangeHandler) => (
  <ValidatorForm
    validators={[Validators.PasswordValidation]}
    label="input.label.password"
    inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
      inputChangeHandler(e.target.value)
    }
    inputplaceholder="*****"
    inputtype="password"
  />
);
