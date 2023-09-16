import styled from "styled-components";
import Button from "../Button/index";

export const Container = styled.div`
  width: 100%;
  overflow: auto;
  max-height: 89.5vh;
  @media (max-width: 650px) {
    width: 100%;
    overflow: hidden;
  }
`;
export const TableContainer = styled.table`
  width: 100%;
  table-layout: fixed;
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

export const DeleteModalContainer = styled.div`
  padding: 1rem;
`
