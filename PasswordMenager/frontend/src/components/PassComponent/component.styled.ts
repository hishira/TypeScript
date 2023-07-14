import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 94.5vh;
  @media (max-width: 650px) {
    flex-direction: column;
    overflow: hidden;
  }
`;

export const Entries = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
