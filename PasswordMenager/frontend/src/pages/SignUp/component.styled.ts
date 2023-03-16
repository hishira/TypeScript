import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;
export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  padding: 10px;
  margin-top: 5rem;
  @media (max-width: 1200px) {
    width: 70%;
  }
  @media (max-width: 900px) {
    width: 70%;
  }
  @media (max-width: 489px) {
    width: 100%;
  }
`;