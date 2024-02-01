import { useState } from "react";
import FormElement from "../FormElement";
import { TitleContainer } from "../shared/styled-components";

export const LocalLogin = () => {
  const [password, setPassword] = useState<string>("");
  return (
    <>
      <TitleContainer>Please enter the password to store</TitleContainer>
      <FormElement
        label="input.label.password"
        inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        inputplaceholder="*****"
        inputtype="password"
      />
    </>
  );
};
