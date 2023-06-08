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
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:first-child {
    margin-top: 0.4rem;
  }
  &:not(&:first-child) {
    margin-top: 0.8rem;
  }
`;
export const GroupsIcon = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
`
export const GroupName = styled.div<{ isSelected: boolean }>`
  color: ${({ isSelected }) => (isSelected ? "black" : "slategrey")};
  &:hover {
    cursor: ${({ isSelected }) => (!isSelected ? "pointer" : "default")};
    font-weight: ${({ isSelected }) => (!isSelected ? 550 : "normal")};
  }
`;
