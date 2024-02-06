import { useState } from "react";
import Button from "../Button";
import { ValidatorForm } from "../ValidatorForm";
import { Validators } from "../ValidatorForm/validators";
import { ContentContainer, TitleContainer } from "../shared/styled-components";
import { LocalRegisterElement } from "./component.styled";

export const LocalRegisterComponent = ({
  localRegisterHandle,
}: {
  localRegisterHandle: (password: string) => void;
}) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [validConfirmPassword, setValidConfirmPassword] =
    useState<boolean>(true);
  const passwordValidators: ValidatorFn[] = [
    Validators.MinLength(6),
    Validators.Required,
  ];
  const confirmPassowrdValidators: ValidatorFn[] = [
    Validators.MinLength(6),
    Validators.Required,
    Validators.SaveValue(password, "Must be same as password"),
  ];
  const addUser = () => {
    if (inValidFields()) {
      return;
    }
    localRegisterHandle(password);
  };
  const inValidFields = (): boolean => {
    const passwordIsInvalid = Validators.StaticFieldValidation(
      password,
      ...passwordValidators
    );
    const isConfirmPasswordInvalid = Validators.StaticFieldValidation(
      confirmPassword,
      ...confirmPassowrdValidators
    );
    return passwordIsInvalid || isConfirmPasswordInvalid;
  };
  return (
    <LocalRegisterElement>
      <TitleContainer>
        Use password manager locally, please enter fields
      </TitleContainer>
      <ContentContainer>
        Passwords and data will be stored at broswere. Passwords will be
        encrypted using entered password
      </ContentContainer>
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
        Create
      </Button>
    </LocalRegisterElement>
  );
};
