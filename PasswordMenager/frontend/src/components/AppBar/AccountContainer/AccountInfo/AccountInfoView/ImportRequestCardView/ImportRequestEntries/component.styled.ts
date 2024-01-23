import styled from "styled-components";

export const ImportRequestEntriesModal = styled.div`
  background-color: whitesmoke;
  padding: 1rem;
  justify-self: center;
  align-self: center;
  height: 35rem;
  min-height: 35rem;
  max-height: 35rem;
  width: 45rem;
  overflow: scroll;
  overflow-x: hidden;
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

export const ImportEntriesTable = styled.div`
  display: flex;
  padding: 0;
  flex-direction: column;
`;
export const ImportRequestHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 8px;
  flex-wrap: nowrap;
  & > div {
    //width: 20%;
    inline-size: 20%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const TitleContainer = styled.div`
  & > span {
    font-size: 20px;
    font-weight: 550;
    color: rgba(0, 0, 0, 0.8);
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > svg {
    cursor: pointer;
  }
`;
