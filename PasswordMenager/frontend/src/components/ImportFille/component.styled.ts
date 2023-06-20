import styled from "styled-components";

export const ImportContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: whitesmoke;
  border-radius: 10px;
`;

export const FileSelectorComponent = styled.div`
  display: flex;
  flex-direction: column;
`
export const ErrorMessasge = styled.span`
  color: lightcoral
`
export const ImportInput = styled.input.attrs({
  type: "file",
  multiple: false,
})`
  padding: 1rem 1.5rem;
  font: 1rem/1.5 "PT Sans", Arial, sans-serif;
  color: slategray;
  &::file-selector-button{
   outline: none;
   background-color: transparent;
   border: .05rem solid slategray;
   padding: .3rem;
   border-radius: 10px;
   font: 1rem/1.5 "PT Sans", Arial, sans-serif;
   color: gray;
   cursor: pointer;

  }
`;
