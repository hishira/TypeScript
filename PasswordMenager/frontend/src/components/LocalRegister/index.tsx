import { inject, observer } from "mobx-react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Databases } from "../../local-database/init";
import { IGeneral } from "../../models/General";
import { ErrorPopUpObject, SuccessPopUpObject } from "../../utils/popup.utils";
import Button from "../Button";
import { ValidatorForm } from "../ValidatorForm";
import { Validators } from "../ValidatorForm/validators";
import { ContentContainer, TitleContainer } from "../shared/styled-components";
import { LocalRegisterElement } from "./component.styled";

const LocalRegisterComponent = ({ store }: { store?: IGeneral }) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validPassword, setValidPassoword] = useState<boolean>(false);
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
  const history = useHistory();
  const addUser = () => {
    console.log(inValidFields());
    if (inValidFields()) {
      return;
    }
    Databases.getInstance()
      .getDatabase("user")
      ?.add({ password: password })
      .then((response) => {
        if (response) {
          store?.setPopUpinfo(
            SuccessPopUpObject("Create local account successfull")
          );
          history.push("/login");
          return;
        }
        store?.setPopUpinfo(
          ErrorPopUpObject("Error occur while creating local account")
        );
      });
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
        isValid={(a) => setValidPassoword(a)}
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

export default inject("store")(observer(LocalRegisterComponent));
