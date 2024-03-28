import styled, { keyframes } from "styled-components";

export const CardsContainer = styled.div`
  width: 90%;
  padding: 2rem;
  max-height: 89.5vh;
  overflow: auto;
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

export const Cards = styled.div`
  width: 80%;
  display: flex;
  justify-items: center;
  justify-content: center;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
  & > div:not(:first-child) {
    margin-top: 1.5rem;
  }
`;
export const Card = styled.div`
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 4px 10px;
  padding: 0.5rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  height: 2rem;
  min-height: 2rem;
  max-height: 2rem;
  box-sizing: border-box;
`;
const CarExpandAnimation = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;
export const CardExpand = styled.div`
  padding: 2rem;
  opacity: 0;
  transition: opacity 0.7s 0.5s;
  transition: position 0.5s 0.5s;
  animation: ${CarExpandAnimation} 0.5s ease forwards;
  & > div > svg{
    margin-top: 1.3rem;
  }
`;
export const CardExpandContent = styled.div`
  width: 100%;
`;
export const CardFieldName = styled.div`
  font-weight: 550;
  width: 50%;
  min-width: 50%;
  max-width: 50%;
`;
export const CardFieldValue = styled.div`
  display: flex;
  min-width: 50%;
  max-width: 50%;
  text-overflow: clip;
  overflow: hidden;
  &[type="password"] {
    cursor: pointer;
  }
  & > span{
    cursor: pointer;
  }
`;

export const CardFieldValueURL = styled.div`
  min-width: 50%;
  cursor: pointer;
  color: blue;
  text-decoration: underline;
`
export const CardExpandContentRow = styled.div`
  display: flex;
  width: 80%;
  gap: 2rem;
`;

export const CardContent = styled.div`
  display: inline-block;
  gap: 2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  & > div:nth-child(2) {
    gap: 1.5rem;
  }
`;
export const CardIcons = styled.div`
  display: flex;
  gap: 5rem;
  & > svg {
    &:hover {
      cursor: pointer;
    }
  }
`;


export const EmptySpan = styled.span`
  color: slategrey;
`