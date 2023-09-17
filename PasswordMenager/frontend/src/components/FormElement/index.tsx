import React from "react";
import InputField from "../InputField/index";
import {
  FormElementComponent,
  InputLabel,
  InputLabelContainer,
} from "./component.styled";
import { Translation } from "../Translation";
import { InfoIcon } from "../icons/InfoIcon";

type Props = {
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
  withBorder?: boolean,
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
  withBorder
}: Props): JSX.Element => {
  return (
    <FormElementComponent width={width}>
      <InputLabelContainer>
        <InputLabel fontSize={fontSize}>{Translation(label)}</InputLabel>
        {(withTooltip && tooltipText) ? (
          <span>
            <InfoIcon /> <span test-tooltip="tooltip-text">{Translation(tooltipText)}</span>
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
      />
    </FormElementComponent>
  );
};

export default FormElement;
