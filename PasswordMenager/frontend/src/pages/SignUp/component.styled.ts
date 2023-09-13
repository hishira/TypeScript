import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;
export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
  padding: 10px;
  margin-top: 5rem;
  @media (max-width: 1200px) {
    width: 95%;
  }
  @media (max-width: 489px) {
    width: 100%;
  }
`;