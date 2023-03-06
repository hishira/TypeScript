import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30%;
  border-right: 0.1rem solid slategray;
  @media (max-width: 650px) {
    width: 100%;
  }
`;
export const Groups = styled.div`
  height: 100%;
  max-height: 100%;
  overflow: auto;
  scroll-behavior: smooth;
  @media (max-width: 650px) {
    max-height: initial;
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
`;

export const NewGroup = styled.div`
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  width: 100%;
`;
export const GroupContainer = styled.div`
  border:0.1rem solid lightgrey;
  padding: 0.5rem;
  text-align: center;
  &:not(&:first-child){
    margin-top: 0.4rem;
  }
  &:hover {
    cursor: pointer;
    background-color: lightgray;
  }
`;