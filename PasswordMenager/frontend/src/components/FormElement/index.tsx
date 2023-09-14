import React from "react";
import InputField from "../InputField/index";
import { FormElementComponent, InputLabel } from "./component.styled";
import { Translation } from "../Translation";

type Props = {
  label: string;
  inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputplaceholder: string;
  inputtype: string;
  value?: string | number;
  fontSize?: string;
  inputFontSize?: string,
  width?: string;
};
const FormElement = ({
  label,
  inputChange,
  inputplaceholder,
  inputtype,
  value,
  fontSize,
  inputFontSize,
  width,
}: Props): JSX.Element => {
  return (
    <FormElementComponent width={width}>
      <InputLabel fontSize={fontSize}>{Translation(label)}</InputLabel>
      <InputField
        onChange={inputChange}
        placeholder={inputplaceholder}
        type={inputtype}
        value={value}
        inputFontSize={inputFontSize}
      />
    </FormElementComponent>
  );
};

export default FormElement;
