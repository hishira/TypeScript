import { LocalRegisterUtil } from "../../hooks/localRegisterUtil.hook";
import Button from "../Button";
import { Translation } from "../Translation";
import { ValidatorForm } from "../ValidatorForm";
import { ContentContainer, TitleContainer } from "../shared/styled-components";
import { LocalRegisterElement } from "./component.styled";

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
  
  return (
    <LocalRegisterElement>
      <TitleContainer>{Translation("localSignUp.title")}</TitleContainer>
      <ContentContainer>{Translation("localSignUp.subTitle")}</ContentContainer>
      <ValidatorForm
        label="input.label.password"
        width="100%"
        inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        inputplaceholder="*****"
        inputtype="password"
        validators={passwordValidators}
        isValid={(a) => setValidPassword(a)}
      />
      <ValidatorForm
        label="input.label.confirmPassword"
        width="100%"
        inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setConfirmPassword(e.target.value)
        }
        isValid={(a) => setValidConfirmPassword(a)}
        inputplaceholder="*****"
        inputtype="password"
        validators={confirmPassowrdValidators}
      />
      <Button
        disabled={!validPassword || !validConfirmPassword}
        onClick={() => addUser()}
      >
        {Translation("localSignUp.create")}
      </Button>
    </LocalRegisterElement>
  );
};
