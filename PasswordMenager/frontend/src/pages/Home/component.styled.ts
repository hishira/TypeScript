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
  border: 0.5px solid slategray;
  padding: .8rem 4rem;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    background-color: #ccc;
    transition: background-color 0.4s;
  }
`;
export const Typograph = styled.span`
  font-size: 2rem;
  font-weight: 550;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8rem;
  flex-direction: row;
  margin-top: 32px;
`;
