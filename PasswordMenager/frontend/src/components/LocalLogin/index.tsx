import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Databases } from "../../local-database/init";
import Button from "../Button";
import FormElement from "../FormElement";
import { TitleContainer } from "../shared/styled-components";
import { LocalLoginElement } from "./component.styled";

export const LocalLogin = ({
  loginButtonhandle,
}: {
  loginButtonhandle: (password: string) => void;
}) => {
  const [password, setPassword] = useState<string>("");
  const history = useHistory();
  useEffect(() => {
    Databases.getInstance()
      .getDatabase("user")
      ?.getAll()
      .then((userArray) => {
        if (userArray.length <= 0) {
          history.push("/local-signup");
        }
      });
  });
  const LoginHandler = () => {
    loginButtonhandle(password);
  };
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
      <Button onClick={LoginHandler}>Login</Button>
    </LocalLoginElement>
  );
};
