import { LocalRegisterUtil } from "../../hooks/localRegisterUtil.hook";
import Button from "../Button";
import { Translation } from "../Translation";
import { ValidatorForm } from "../ValidatorForm";
import { ContentContainer, TitleContainer } from "../shared/styled-components";
import { LocalRegisterElement } from "./component.styled";
import { ValidateConfirmPasswordForm } from "./validate-confirm-password";
import { ValidatePasswordForm } from "./validate-password-form";

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
