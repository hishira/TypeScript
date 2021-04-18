import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GetUserEntriesByGroupID } from "../../utils/entry.utils";
const Container = styled.div`
  width: 70%;
  outline: 0.1rem solid yellow;
  overflow: auto;
  max-height: 89.5vh;
`;
const TableContainer = styled.table`
  width: 100%;
`;
const TableHead = styled.thead``;
const TableBody = styled.tbody``;
const TableRow = styled.tr``;
const TableComponent = styled.td`
  border: 2px solid red;
  text-align: center;
`;
const FieldsContainer = ({
  selectedgroup,
}: FieldsComponentType): JSX.Element => {
  const [entries, setentries] = useState<Array<IEntry>>([]);

  const fetchEntries = async (): Promise<void> => {
    if (selectedgroup === "") return;
    const groupid: GroupId = {
      id: selectedgroup,
    };
    const response: GetEntriesResponse = await GetUserEntriesByGroupID(groupid);
    if (response.status) {
      console.log(response.response);
      setentries(response.response);
    } else {
      setentries([]);
    }
  };
  useEffect(() => {
    fetchEntries();
  }, [selectedgroup]);
  return (
    <Container>
      <TableContainer>
        <TableHead>
          <TableRow>
            <th>Title</th>
            <th>Username</th>
            <th>Password</th>
            <th>Note</th>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry) => (
            <TableRow>
              <TableComponent>{entry.title}</TableComponent>
              <TableComponent>{entry.username}</TableComponent>
              <TableComponent>{entry.password}</TableComponent>
              <TableComponent>{entry.note}</TableComponent>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </Container>
  );
};

export default FieldsContainer;
