import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GetUserEntriesByGroupID } from "../../utils/entry.utils";
const Container = styled.div`
  width: 70%;
  outline: 0.1rem solid yellow;
  overflow: auto;
  max-height: 89.5vh;
  @media (max-width: 500px){
    width: 100%;
    max-height: none;
    overflow: hidden;
  }
`;
const TableContainer = styled.table`
  width: 100%;
`;
const TableHead = styled.thead``;
const TableBody = styled.tbody``;
const TableRow = styled.tr``;

const TableComponent = styled.td<TableComponentProps>`
  border: 2px solid red;
  text-align: center;
  ${(props) => props.password && "cursor: pointer"}
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

  const gettext = (text: string | null): string => {
    return text ? text : "";
  };
  const passwordClick = (entryid: string) => {
    let elementpass: HTMLElement | null = document.getElementById(entryid);
    console.log(elementpass);
    if (elementpass !== null) {
      navigator.clipboard
        .writeText(gettext(elementpass.textContent))
        .then(() => console.log("ok"))
        .catch((e)=>console.log("not ok"));
    }
  };
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
              <TableComponent
                id={entry._id}
                onClick={() => [passwordClick(entry._id)]}
                password
              >
                {entry.password}
              </TableComponent>
              <TableComponent>{entry.note}</TableComponent>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </Container>
  );
};

export default FieldsContainer;
