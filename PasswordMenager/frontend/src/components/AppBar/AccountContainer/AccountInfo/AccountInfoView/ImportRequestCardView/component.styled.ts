import styled from "styled-components";

export const ImportRequest = styled.div`
  display: flex;
  min-height: 10rem;
  max-height: 30rem;
  flex-direction: column;
  & > div:first-of-type {
    display: flex;
    padding: 4px;
    box-sizing: border-box;
    justify-content: space-between;
  }
`;

export const Imports = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: white;
  }
  &::-webkit-scrollbar-thumb {
    background-color: lightslategray;
    border-radius: 15px;
    width: 1px;
  }
  box-sizing: border-box;
  min-height: 10rem;
  max-height: 35rem;

  overflow: auto;
  & > div {
    display: flex;
    padding: 4px;
    box-sizing: border-box;
    justify-content: space-between;
  }
`;