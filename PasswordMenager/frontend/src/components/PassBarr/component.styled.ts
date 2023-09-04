import styled from "styled-components";

export const GroupContainer = styled.div`
  display:flex ;
  & > button:not(:first-child) {
    margin-left: 15px;
  }
  width: 100%;
  gap: .5rem;
`;

export const Container = styled.div`
  display: flex;
  padding: 5px;
  height: 3rem;
  width: 100%;
  justify-content: center;
`;

export const ModalButtonsContainer = styled.div`
  display: flex;
  background-color: whitesmoke;
  border-radius: 5px;
  gap: 12px;
  padding: 2rem;
  flex-direction: column;
  width: 10rem;
`