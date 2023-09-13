import React from "react";
import { TranslationFunction } from "../Translation";
import { Input } from "./component.styled";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  value?: string | number;
};
const InputField = ({
  onChange,
  placeholder,
  type,
  value,
}: Props): JSX.Element => {
  return (
    <Input
      onChange={onChange}
      placeholder={TranslationFunction(placeholder)}
      type={type}
      value={value}
    />
  );
};

export default InputField;
