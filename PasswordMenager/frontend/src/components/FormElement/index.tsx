import React from "react";
import InputField from "../InputField/index";
import { FormElementComponent, InputLabel } from "./component.styled";
import { Translation } from "../Translation";

type Props = {
  label: string;
  inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputplaceholder: string;
  inputtype: string;
  value?: string | number
};
const FormElement = ({
  label,
  inputChange,
  inputplaceholder,
  inputtype,
  value
}: Props): JSX.Element => {
  return <FormElementComponent>
      <InputLabel>{Translation(label)}</InputLabel>
      <InputField
        onChange={inputChange}
        placeholder={inputplaceholder}
        type={inputtype}
        value={value}
      />
  </FormElementComponent>;
};

export default FormElement;
