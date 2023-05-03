import styled from "styled-components";

export const ImportContainer = styled.div`
  display: flex;
  padding: 2rem;
  background-color: whitesmoke;
  border-radius: 10px;
`;

export const ImportInput = styled.input.attrs({
  type: "file",
  multiple: false,
})`
  padding: 2px;
`;
