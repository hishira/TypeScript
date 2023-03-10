import styled from "styled-components";

export const TableContainer = styled.table`
  width: 100%;
`;
export const TableHead = styled.thead``;
export const TableBody = styled.tbody`
  width: 100%;
`;
export const TableRow = styled.tr`
  z-index: 1;
  max-width: 100%;
  min-width: 100%;
  width: 100%;
  & > th {
    max-width: 20%;
    min-width: 20%;
    width: 20%;
  }
`;
