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
`
