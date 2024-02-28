import styled from "styled-components";

export const NewGroup = styled.div`
  background-color: white;
  border-radius: 10px;
  //border-bottom-left-radius: 0;
  //border-bottom-right-radius: 0;
  width: 25rem;
  //width: 100%;
  & > div,
  p {
    padding: 15px;
  }
  & > button {
    width: 100%;
    margin: 0;
    padding: 16px;
    border-radius: 0px;
    border-color: white;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    &:disabled {
      background-color: grey;
    }
  }
`;
