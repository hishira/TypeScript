import { useEffect, useState } from "react";
import { Databases } from "../../local-database/init";
import FormElement from "../FormElement";
import { TitleContainer } from "../shared/styled-components";
import { LocalLoginElement } from "./component.styled";

export const LocalLogin = () => {
  const [password, setPassword] = useState<string>("");
  useEffect(() => {
    Databases.getInstance().getDatabase("user")?.getAll().then(console.log);
  });
  return (
    <LocalLoginElement>
      <TitleContainer>Please enter the password to store</TitleContainer>
      <FormElement
        label="input.label.password"
        inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        inputplaceholder="*****"
        inputtype="password"
      />
    </LocalLoginElement>
  );
};
