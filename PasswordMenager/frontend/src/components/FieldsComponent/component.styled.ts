import styled from "styled-components";
import Button from "../Button/index";

export const Container = styled.div`
  width: 70%;
  outline: 0.1rem solid yellow;
  overflow: auto;
  max-height: 89.5vh;
  @media (max-width: 650px) {
    width: 100%;
    overflow: hidden;
  }
`;
export const TableContainer = styled.table`
  width: 100%;
`;
export const TableHead = styled.thead``;
export const TableBody = styled.tbody``;
export const TableRow = styled.tr`
  z-index: 1;
`;

export const TableComponent = styled.td<TableComponentProps>`
  text-align: center;
  ${(props) => props.password && "cursor: pointer"}
`;
export const TableButton = styled(Button)`
  @media (max-width: 708px) {
    display: none;
  }
`;
export const MinButton = styled(TableButton)`
  display: none;
  @media (max-width: 708px) {
    display: block;
    cursor: pointer;
  }
`;
export const ListComponent = styled.div`
  display: flex;
  border: 0.1rem solid lightslategray;
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