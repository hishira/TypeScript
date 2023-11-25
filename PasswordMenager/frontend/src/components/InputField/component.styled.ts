import styled from "styled-components";

const getInputFontSize = (userFontSize?: string): string => {
  return userFontSize ?? "1.15rem";
};

const hasBorderBottom = (withBorder?: boolean): string => {
  return withBorder ? "none" : "1px solid grey";
};
const getBorder = (radius: boolean, withBorder?: boolean) => {
  if (radius) return withBorder ? "10px" : "none";
  return withBorder ? "1px solid grey" : "none";
};
export const Input = styled.input<{ fontSize?: string; withBorder?: boolean }>`
  width: 90%;
  padding: 10px 15px;
  font-size: ${({ fontSize }) => getInputFontSize(fontSize)};
  border-bottom: ${({ withBorder }) => hasBorderBottom(withBorder)};
  //border: ${({ withBorder }) => getBorder(false, withBorder)};
  border: none;
  border-bottom: .2px solid slategrey;
  //border-radius: ${({ withBorder }) => getBorder(true, withBorder)};
  margin-top: 0.5rem;
  &:focus {
    outline: none;
    //border-bottom: ${({ withBorder }) => hasBorderBottom(withBorder)};
    //border-radius: ${({ withBorder }) => getBorder(true, withBorder)};
    border: ${({ withBorder }) => getBorder(false, withBorder)};
    border-bottom: .2px solid slategrey;
  }
`;
