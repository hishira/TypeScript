import { ValidatorForm } from "../ValidatorForm";
import { Validators } from "../ValidatorForm/validators";
export const FormEmailField = ({
  isEmailAvailable,
  emailSetHandle,
}: {
  isEmailAvailable: boolean;
  emailSetHandle: (value: string) => void;
}) => {
  return isEmailAvailable ? (
    <ValidatorForm
      validators={[Validators.EmailValidation]}
      label="input.label.email"
      inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        emailSetHandle(e.target.value)
      }
      inputplaceholder="email.input.label.placeholder"
      inputtype="text"
    />
  ) : null;
};
