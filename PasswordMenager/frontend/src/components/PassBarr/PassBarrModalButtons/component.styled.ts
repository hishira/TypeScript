import styled from "styled-components";
export const ModalButtonsContainer = styled.div`
  display: flex;
  background-color: whitesmoke;
  border-radius: 5px;
  gap: 12px;
  padding: 2rem;
  flex-direction: column;
  width: 35rem;
`
export const ExportButtons = styled.div`
  margin-top: 24px;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 12px;
  @media screen and (min-width: 800px){
    flex-direction: row;
  }
`