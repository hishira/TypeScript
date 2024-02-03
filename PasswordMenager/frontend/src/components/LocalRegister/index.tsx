import { useState } from "react";
import FormElement from "../FormElement";
import { ValidatorForm } from "../ValidatorForm";
import { ContentContainer, TitleContainer } from "../shared/styled-components";
import { LocalRegisterElement } from "./component.styled";

const PasswordValidation: ValidatorFn = (passowrd: unknown) => {
  if (typeof passowrd === "string" && passowrd.length < 6)
    return {
      password: { message: "Passowrd should has minimum 6 characters" },
    };
  return null;
};
export const LocalRegisterComponent = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <LocalRegisterElement>
      <TitleContainer>
        Use password manager locally, please enter fields
      </TitleContainer>
      <ContentContainer>
        Passwords and data will be stored at broswere. Passwords will be
        encrypted using entered password
      </ContentContainer>
      {/* <FormElement
        label="input.label.password"
        width="100%"
        inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        inputplaceholder="*****"
        inputtype="password"
      /> */}
      <ValidatorForm
        label="input.label.password"
        width="100%"
        inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        inputplaceholder="*****"
        inputtype="password"
        validators={[PasswordValidation]}
      />
      <FormElement
        width="100%"
        label="input.label.confirmPassword"
        inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setConfirmPassword(e.target.value)
        }
        inputplaceholder="*****"
        inputtype="password"
      />
    </LocalRegisterElement>
  );
};
