import { useState } from "react";
import { Databases } from "../../local-database/init";
import Button from "../Button";
import { ValidatorForm } from "../ValidatorForm";
import { Validators } from "../ValidatorForm/validators";
import { ContentContainer, TitleContainer } from "../shared/styled-components";
import { LocalRegisterElement } from "./component.styled";

export const LocalRegisterComponent = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validForm, setValidForm] = useState<boolean>(false);
  const addUser = () => {
    Databases.getInstance().getDatabase("user")?.add({ password: password });
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
        validators={[Validators.MinLength(6), Validators.Required]}
        isValid={(a) => setValidForm(a)}
      />
      <ValidatorForm
        label="input.label.confirmPassword"
        width="100%"
        inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setConfirmPassword(e.target.value)
        }
        isValid={(a) => setValidForm(a)}
        inputplaceholder="*****"
        inputtype="password"
        validators={[
          Validators.MinLength(6),
          Validators.Required,
          Validators.SaveValue(password, "Must be same as password"),
        ]}
      />
      <Button disabled={!validForm} onClick={() => addUser()}>
        Create
      </Button>
    </LocalRegisterElement>
  );
};
