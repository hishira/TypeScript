import styled from "styled-components";

export const NewGroup = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 25rem;
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
      background-color: lightgray;
      border-top: .5px solid slategray;
    }
  }
`;
