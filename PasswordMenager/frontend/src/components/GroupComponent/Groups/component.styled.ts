import styled, { keyframes } from "styled-components";

const iconOpenAnimation = keyframes`
  from{
    rigth: -500%;
  }
  to{
    right: 0;
  }
`;
export const Groups = styled.div`
  height: 100%;
  max-height: 100%;
  padding-left: 1.5rem;
  overflow: auto;
  overflow-x: hidden;
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
  color: ${({ isSelected }) => (isSelected ? "black" : "slategrey")};
  &:hover {
    cursor: ${({ isSelected }) => (!isSelected ? "pointer" : "default")};
    font-weight: ${({ isSelected }) => (!isSelected ? 550 : "normal")};
  }
`;
export const GroupsIcon = styled.div`
  justify-content: space-between;
  gap: 20px;
  display: none;
  position: absolute;
  top: 0;
  right: -500%;
  z-index: 2000;
  padding-inline: 2rem 1rem;
  animation: ${iconOpenAnimation} 0.4s linear forwards;
  & > svg[role="edit"],
  svg[role="delete"] {
    cursor: pointer;
  }
  & > svg[role="edit"]:hover {
    & > path {
      fill: slategray;
    }
  }
  & > svg[role="delete"]:hover {
    & > path:first-child {
      fill: lightcoral;
    }
  }
`;
export const GroupOption = styled.div`
  position: relative;
  box-sizing: border-box;
  &:hover {
    color: transparent;
    & > div {
      display: flex;
    }

    & > svg {
      visibility: hidden;
    }
  }
`;
export const GroupName = styled.div``;
