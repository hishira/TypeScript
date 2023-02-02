import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  outline: 0.1rem solid slategray;
  height: 89.5vh;
  @media (max-width: 650px) {
    flex-direction: column;
    overflow: hidden;
  }
`;
