import { ValidatorForm } from "../ValidatorForm";

export type ValidatorElementPropr = {
  inputFunction: (value: string) => void;
  validators: ValidatorFn[];
  setValid: (val: boolean) => void;
};
export const ValidatePasswordForm = ({
  inputFunction,
  validators,
  setValid,
}: ValidatorElementPropr) => (
  <ValidatorForm
    label="input.label.password"
    width="100%"
    inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
      inputFunction(e.target.value)
    }
    inputplaceholder="*****"
    inputtype="password"
    validators={validators}
    isValid={(a) => setValid(a)}
  />
);
