import { useState } from "react";
import { CheckIfLocelUserExists } from "../../hooks/checkIfLocalUserExists.hook";
import Button from "../Button";
import FormElement from "../FormElement";
import { Translation } from "../Translation";
import { TitleContainer } from "../shared/styled-components";
import { LocalLoginElement } from "./component.styled";

export const LocalLogin = ({
  loginButtonhandle,
}: {
  loginButtonhandle: (password: string) => void;
}) => {
  const [password, setPassword] = useState<string>("");
  CheckIfLocelUserExists();
  const LoginHandler = () => {
    loginButtonhandle(password);
  };
  return (
    <LocalLoginElement>
      <TitleContainer>{Translation("localLogin.enterPassword")}</TitleContainer>
      <FormElement
        label="input.label.password"
        inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        inputplaceholder="*****"
        inputtype="password"
        value={password}
      />
      <Button color="whitesmoke" onClick={() => LoginHandler()}>
        {Translation("page.login.button.text")}
      </Button>
    </LocalLoginElement>
  );
};
