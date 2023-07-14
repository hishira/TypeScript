import styled from "styled-components";

export const PaginatorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  padding: 1.5rem;
  & > svg {
    &:hover {
      cursor: pointer;
    }
  }
`;
