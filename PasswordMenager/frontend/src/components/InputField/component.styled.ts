import styled from "styled-components";

export const Input = styled.input`
  width: 90%;
  padding: 10px 15px;
  border: none;
  font-size: 1.15rem;
  border-bottom: 1px solid grey;
  //border-radius: 10px;
  margin-top: 0.5rem;
  &:focus {
    outline: none;
    border-bottom: 1px solid slategray;
    //border-radius: 10px;
  }
`;
