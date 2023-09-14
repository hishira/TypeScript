import styled from "styled-components";

const getInputFontSize = (userFontSize?: string): string => {
  return userFontSize ?? "1.15rem";
};
export const Input = styled.input<{ fontSize?: string }>`
  width: 90%;
  padding: 10px 15px;
  border: none;
  font-size: ${({ fontSize }) => getInputFontSize(fontSize)};
  border-bottom: 1px solid grey;
  //border-radius: 10px;
  margin-top: 0.5rem;
  &:focus {
    outline: none;
    border-bottom: 1px solid slategray;
    //border-radius: 10px;
  }
`;
