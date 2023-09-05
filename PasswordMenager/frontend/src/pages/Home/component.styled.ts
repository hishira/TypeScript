import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 90vh;
`;
export const ButtonContainer = styled.div`
  border: .5px solid slategray;
  padding: 2rem 4rem;
  border-radius: 10px;
  &:hover{
    cursor: pointer;
    background-color: #cccccc;
    transition: background-color .4s;
  }
`
export const Typograph = styled.span`
  font-size: 2rem;
  font-weight: 550;
`;
