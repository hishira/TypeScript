import React from "react";
import styled from "styled-components";
import InputField from "../InputField/";
const FormElementComponent = styled.p`
  display: flex;
  flex-direction: column;
  width: 90%;
`;
const InputLabel = styled.label`
  font-size: 1.2rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 5px 5px 5px 0px;
`;
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
