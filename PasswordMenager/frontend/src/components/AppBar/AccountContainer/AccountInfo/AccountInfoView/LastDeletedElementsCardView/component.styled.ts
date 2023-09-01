import styled from "styled-components";

export const LastDeletedElements = styled.div`
  overflow: auto;
  min-height: 25rem;
  max-height: 25rem;
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
`;

export const Elements = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

export const LastDeletedTitle = styled.span`
  font-size: 18px;
  font-weight: 550;
`;

export const LastDeletedElement = styled.div`
  margin-top: 0.8rem;
`;
