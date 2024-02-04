import React from "react";
import { TranslationFunction } from "../Translation";
import { Input } from "./component.styled";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  value?: string | number;
  inputFontSize?: string;
  withBorder?: boolean;
  isError?: boolean;
};
const InputField = ({
  onChange,
  placeholder,
  type,
  value,
  inputFontSize,
  withBorder,
  isError
}: Props): JSX.Element => {
  return (
    <Input
      onChange={onChange}
      placeholder={TranslationFunction(placeholder)}
      type={type}
      withBorder={withBorder}
      value={value}
      fontSize={inputFontSize}
      isError={isError}
    />
  );
};

export default InputField;
