import styled from "styled-components";

export const FormElementComponent = styled.p<{ width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width || "90%"}
`;
export const InputLabel = styled.label<{ fontSize?: string }>`
  font-size: ${({ fontSize }) => fontSize ?? " 1.2rem"};
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 5px 5px 5px 0px;
  padding-left: 0.3rem;
`;
