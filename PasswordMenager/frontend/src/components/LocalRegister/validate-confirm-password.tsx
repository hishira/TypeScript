import { ValidatorForm } from "../ValidatorForm";
import { ValidatorElementPropr } from "./validate-password-form";

export const ValidateConfirmPasswordForm = ({
  inputFunction,
  validators,
  setValid,
}: ValidatorElementPropr) => (
  <ValidatorForm
    label="input.label.confirmPassword"
    width="100%"
    inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
      inputFunction(e.target.value)
    }
    isValid={(a) => setValid(a)}
    inputplaceholder="*****"
    inputtype="password"
    validators={validators}
  />
);
