import styled from "styled-components";

export const CardsContainer = styled.div`
  width: 75%;
  padding: 4rem;
  max-height: 89.5vh;
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
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  padding: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 4px 10px;
  height: 3rem;
`;
export const CardContent = styled.div`

`
export const CardIcons = styled.div`
  display: flex;
`;
