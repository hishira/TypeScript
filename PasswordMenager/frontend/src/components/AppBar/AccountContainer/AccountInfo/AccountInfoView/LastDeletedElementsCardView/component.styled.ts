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
  display: flex;
  flex-direction: row;
  justify-content:space-between ;
  align-items: center;
`;
export const LastDeletedEntryInfo = styled.div`
  display: flex;
  gap: 5rem;
  width: 80%;
  &  > div{
    width: 30%;
    min-width: 30%;
    max-width: 30%;
  }
`

export const LastDeletedInfoElement = styled.div`
  word-break: break-all;
`