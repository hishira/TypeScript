import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 94.5vh;
  overflow-x: hidden;
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
  @media (min-width: 950px) {
    overflow: hidden;
    overflow-y: hidden;
  }
  @media (max-width: 950px) {
    flex-direction: column;
  }
`;

export const Entries = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const EmptyEntries = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Text = styled.div`
  font-weight: 550;
  font-size: 48px;
  color: lightslategray;
  transform: rotate(-5deg);
`;
