import styled from "styled-components";

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
export const GroupContainer = styled.div<{ isSelected: boolean }>`
  //border: 0.1rem solid lightgrey;
  padding: 0.5rem;
  color: ${({ isSelected }) => (isSelected ? "black" : "slategrey")};
  //text-align: left;
  &:first-child {
    margin-top: 0.4rem;
  }
  &:not(&:first-child) {
    margin-top: 0.8rem;
  }
  &:hover {
    cursor:  ${({ isSelected }) => (!isSelected ? 'pointer' : "default")};;
    font-weight: ${({ isSelected }) => (!isSelected ? 550 : "normal")};
  }
`;
