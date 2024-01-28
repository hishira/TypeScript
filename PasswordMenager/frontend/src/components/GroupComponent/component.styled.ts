import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 25%;
  border-right: 0.1rem solid lightgray;
  padding-right: 1rem;
  @media (max-width: 1200px){
    width: 35%;
    padding-right: 1.25rem;
  }
  @media (max-width: 950px) {
    width: 100%;
  }
`;
export const Groups = styled.div`
  height: 100%;
  max-height: 100%;
  padding-left: 2rem;
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
export const Category = styled.div`
  padding: 1rem .1rem 1rem 1rem;
  text-transform: uppercase;
  color: slategray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  position: relative;
  box-sizing: border-box;

`
export const NewGroup = styled.div`
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  width: 100%;
`;
export const GroupContainer = styled.div<{ isSelected: boolean }>`
  //border: 0.1rem solid lightgrey;
  padding: 0.5rem;
  //text-align: left;
  &:first-child{
    margin-top: .4rem;
  }
  &:not(&:first-child) {
    margin-top: .8rem;
  }
  &:hover {
    cursor: pointer;
    background-color: whitesmoke;
  }
  background-color: ${({ isSelected }) => (isSelected ? "whitesmoke" : null)};
`;
