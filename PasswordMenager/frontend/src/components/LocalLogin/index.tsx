import { useEffect, useState } from "react";
import { Databases } from "../../local-database/init";
import FormElement from "../FormElement";
import { TitleContainer } from "../shared/styled-components";
import { LocalLoginElement } from "./component.styled";
import { useHistory } from "react-router-dom";

export const LocalLogin = () => {
  const [password, setPassword] = useState<string>("");
  const history = useHistory();
  useEffect(() => {
    Databases.getInstance().getDatabase("user")?.getAll().then((userArray)=>{
      if(userArray.length <= 0) {
        history.push('/local-signup')
      }
    });
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
