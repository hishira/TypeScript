import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 5px;
  justify-content: center;
  & > *:not(:first-child) {
    margin-left: 15px;
  }
`;
