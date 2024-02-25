import { LocalRegisterUtil } from "../../hooks/localRegisterUtil.hook";
import Button from "../Button";
import { Translation } from "../Translation";
import { ValidatorForm } from "../ValidatorForm";
import { ContentContainer, TitleContainer } from "../shared/styled-components";
import { LocalRegisterElement } from "./component.styled";

type ValidatorElementPropr = {
  inputFunction: (value: string) => void;
  validators: ValidatorFn[];
  setValid: (val: boolean) => void;
};
const ValidatePasswordForm = ({
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
const ValidateConfirmPasswordForm = ({
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

const CreateLocalRegisterButton = ({
  isDisabled,
  handleClick,
}: {
  isDisabled: boolean;
  handleClick: () => void;
}) => (
  <Button disabled={isDisabled} onClick={() => handleClick()}>
    {Translation("localSignUp.create")}
  </Button>
);
export const LocalRegisterComponent = ({
  localRegisterHandle,
}: {
  localRegisterHandle: (password: string) => void;
}) => {
  const {
    setPassword,
    passwordValidators,
    setValidPassword,
    setConfirmPassword,
    setValidConfirmPassword,
    confirmPassowrdValidators,
    validPassword,
    validConfirmPassword,
    addUser,
  } = LocalRegisterUtil(localRegisterHandle);
  const createButtonDisabled = !validPassword || !validConfirmPassword;

  return (
    <LocalRegisterElement>
      <TitleContainer>{Translation("localSignUp.title")}</TitleContainer>
      <ContentContainer>{Translation("localSignUp.subTitle")}</ContentContainer>
      <ValidatePasswordForm
        inputFunction={setPassword}
        validators={passwordValidators}
        setValid={setValidPassword}
      />

      <ValidateConfirmPasswordForm
        inputFunction={setConfirmPassword}
        validators={confirmPassowrdValidators}
        setValid={setValidConfirmPassword}
      />
      <CreateLocalRegisterButton
        isDisabled={createButtonDisabled}
        handleClick={addUser}
      />
    </LocalRegisterElement>
  );
};
