import styled from "styled-components";

export const ImportContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: whitesmoke;
  border-radius: 10px;
`;

export const ImportInput = styled.input.attrs({
  type: "file",
  multiple: false,
})`
  padding: 2rem 1.5rem;
  font: 1rem/1.5 "PT Sans", Arial, sans-serif;
  color: slategray;
  &::file-selector-button{
   outline: none;
   background-color: transparent;
   border: .1rem solid slategray;
   padding: .5rem;
   border-radius: 10px;
   font: 1rem/1.5 "PT Sans", Arial, sans-serif;
   color: gray;
   cursor: pointer;

  }
`;
