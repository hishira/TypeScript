import React from "react";
import InputField from "../InputField/";
import { FormElementComponent, InputLabel } from "./component.styled";

type Props = {
  label: string;
  inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputplaceholder: string;
  inputtype: string;
  value?: string
};
const FormElement = ({
  label,
  inputChange,
  inputplaceholder,
  inputtype,
  value
}: Props): JSX.Element => {
  return <FormElementComponent>
      <InputLabel>{label}</InputLabel>
      <InputField
        onChange={inputChange}
        placeholder={inputplaceholder}
        type={inputtype}
        value={value}
      />
  </FormElementComponent>;
};

export default FormElement;
