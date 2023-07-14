import styled from "styled-components";
import Button from "../../Button/index";

export const Container = styled.div`
  width: 70%;
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
  max-width: 100%;
  min-width: 100%;
  width: 100%;
`;

export const TableComponent = styled.td<TableComponentProps>`
  text-align: center;
  max-width: 20% !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${(props) => props.password && "cursor: pointer"}
`;
export const TableButton = styled(Button)`
  @media (max-width: 1000px) {
    display: none;
  }
`;
export const PasswordTableIcons = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  & > svg {
    &:hover {
      cursor: pointer;
    }
  }
  & > svg[role="edit"]:hover {
    & > path {
      fill: slategray;
    }
  }
  & > svg[role="delete"]:hover {
    & > path:first-child {
      fill: lightcoral;
    }
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;
export const MinButton = styled(TableButton)`
  display: none;
  @media (max-width: 1000px) {
    display: block;
    cursor: pointer;
    margin-left: auto;
    margin-right: auto;
  }
`;
