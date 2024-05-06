import { ValidatorForm } from "../ValidatorForm";
const emailValidation = (value: string) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
      ? null
      : { email: { message: "Wrong email" } };
  };
export const FormEmailField = ({
    isEmailAvailable,
    emailSetHandle,
  }: {
    isEmailAvailable: boolean;
    emailSetHandle: (value: string) => void;
  }) => {
    return isEmailAvailable ? (
      <ValidatorForm
        validators={[emailValidation]}
        label="input.label.email"
        inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          emailSetHandle(e.target.value)
        }
        inputplaceholder="email.input.label.placeholder"
        inputtype="text"
      />
    ) : null;
  };