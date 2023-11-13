import styled from "styled-components";
import Button from "../Button/index";
export const ListComponent = styled.div`
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  width: 15rem;
`;
export const ListItem = styled(Button)`
  cursor: pointer;
  &:not(:first-child) {
    margin-top: 2rem;
  }
`;