import React from "react";
import InputField from "../InputField/index";
import { Translation } from "../Translation";
import { InfoIcon } from "../icons/InfoIcon";
import {
  FormElementComponent,
  InputLabel,
  InputLabelContainer,
} from "./component.styled";

export type FormProps = {
  label: string;
  inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputplaceholder: string;
  inputtype: string;
  value?: string | number;
  fontSize?: string;
  inputFontSize?: string;
  width?: string;
  withTooltip?: boolean;
  tooltipText?: string;
  withBorder?: boolean;
  isError?: boolean;
  errors?: JSX.Element;
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
  withTooltip,
  tooltipText,
  withBorder,
  isError,
  errors,
}: FormProps): JSX.Element => {

  return (
    <FormElementComponent width={width}>
      <InputLabelContainer>
        <InputLabel fontSize={fontSize} isError={isError}>
          {Translation(label)}
        </InputLabel>
        {withTooltip && tooltipText ? (
          <span>
            <InfoIcon />{" "}
            <span test-tooltip="tooltip-text">{Translation(tooltipText)}</span>
          </span>
        ) : null}
      </InputLabelContainer>
      <InputField
        onChange={inputChange}
        placeholder={inputplaceholder}
        type={inputtype}
        value={value}
        withBorder={withBorder}
        inputFontSize={inputFontSize}
        isError={isError}
      />
      {errors}
    </FormElementComponent>
  );
};

export default FormElement;
