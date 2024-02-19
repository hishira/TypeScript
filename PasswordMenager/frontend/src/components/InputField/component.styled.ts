import styled from "styled-components";

const getInputFontSize = (userFontSize?: string): string => {
  return userFontSize ?? "1.15rem";
};

const hasBorderBottom = (withBorder?: boolean, isError?: boolean): string => {
  return withBorder ? "none" : `1px solid ${isError ? "lightsalmon" : "grey"}`;
};
const getBorder = (
  radius: boolean,
  withBorder?: boolean,
  isError?: boolean
) => {
  if (radius) return withBorder ? "10px" : "none";
  const errorColor = isError ? "lightsalmon" : "grey";
  return withBorder ? `1px solid ${errorColor}` : "none";
};
const borderColorCalculate = (isError: boolean | undefined, color: string) => {
  return isError ? "lightsalmon" : color;
};
export const Input = styled.input<{
  fontSize?: string;
  withBorder?: boolean;
  isError?: boolean;
}>`
  width: 90%;
  padding: 10px 15px;
  font-size: ${({ fontSize }) => getInputFontSize(fontSize)};
  border-bottom: ${({ withBorder, isError }) =>
    hasBorderBottom(withBorder, isError)};
  border: none;
  border-bottom: 0.2px solid
    ${({ isError }) => borderColorCalculate(isError, "slategrey")};
  margin-top: 0.5rem;
  &:focus {
    outline: none;
    border: ${({ withBorder, isError }) =>
      getBorder(false, withBorder, isError)};
    border-bottom: 0.2px solid
      ${({ isError }) => borderColorCalculate(isError, "slategrey")};
    box-shadow: .5px .5px .5px  slategray;
    border-bottom: none;
  }
`;
