import { useState } from "react";
import { Validators } from "../components/ValidatorForm/validators";

export const LocalRegisterUtil = (localRegisterHandle: (password: string) => void)=>{
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

    return {
        setPassword,
        passwordValidators,
        setValidPassword,
        setConfirmPassword,
        setValidConfirmPassword,
        confirmPassowrdValidators,
        validPassword,
        validConfirmPassword,
        addUser,
    }
}