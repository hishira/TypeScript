import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "../Modal";
import NewEntryComponent from "../NewEntryComponent";
import {
  DeleteUserEntry,
  GetUserEntriesByGroupID,
} from "../../utils/entry.utils";
import Button from "../Button/index";
import { EMPTYENTRYRESPONSE } from "../../utils/constans.utils";
const Container = styled.div`
  width: 70%;
  outline: 0.1rem solid yellow;
  overflow: auto;
  max-height: 89.5vh;
  @media (max-width: 650px) {
    width: 100%;
    overflow: hidden;
  }
`;
const TableContainer = styled.table`
  width: 100%;
`;
const TableHead = styled.thead``;
const TableBody = styled.tbody``;
const TableRow = styled.tr`
  z-index: 1;
`;

const TableComponent = styled.td<TableComponentProps>`
  text-align: center;
  ${(props) => props.password && "cursor: pointer"}
`;
const TableButton = styled(Button)`

  @media (max-width: 708px) {
    display: none;
  }
`;
const MinButton = styled(TableButton)`
  display: none;
  @media (max-width: 708px) {
    display: block;
    cursor: pointer;
  }
`;
const ListComponent = styled.div`
  display: flex;
  border: 0.1rem solid lightslategray;
  border-radius: 5px;
  flex-direction: column;
  width: 15rem;
`;
const ListItem = styled(Button)`
  cursor: pointer;
  &:not(:first-child) {
    margin-top: 2rem;
  }
`;
type MoreMiniModal = {
  entry: IEntry;
  refreshgroupentities: Function;
  setentrytoedit: Function;
  seteditmodalopen: Function;
  modalClose: Function;
};
const ModalButtonChoicer: React.FC<MoreMiniModal> = ({
  entry,
  refreshgroupentities,
  setentrytoedit,
  seteditmodalopen,
  modalClose,
}: MoreMiniModal): JSX.Element => {
  const deletehandle = async (entryid: string): Promise<void> => {
    console.log(entryid);
    const response: DeleteEntryResponse = await DeleteUserEntry(entryid);
    if (response.status) {
      refreshgroupentities();
      modalClose();
    }
  };
  const onedithandle = (entryid: string): void => {
    setentrytoedit(entryid);
    seteditmodalopen(true);
    modalClose();
  };
  return (
    <ListComponent id={entry._id}>
      <ListItem onClick={() => deletehandle(entry._id)}>Delete</ListItem>
      <ListItem onClick={() => onedithandle(entry._id)}>Edit</ListItem>
    </ListComponent>
  );
};
const FieldsContainer = ({
  selectedgroup,
  refreshgroupentities,
  refreshall,
}: FieldsComponentType): JSX.Element => {
  const [entries, setentries] = useState<Array<IEntry>>([]);
  const [editmodalopen, seteditmodalopen] = useState<boolean>(false);
  const [entrytoedit, setentrytoedit] = useState<string>("");
  const [refreshmodalentry, setrefreshmodalentry] = useState<boolean>(false);
  const [smallmodalopen, setsmallmodalopen] = useState<boolean>(false);
  const [entrywithsmallbutton, setentrywithsmallbutton] =
    useState<IEntry>(EMPTYENTRYRESPONSE);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 708) {
        setsmallmodalopen(false);
        setentrywithsmallbutton(EMPTYENTRYRESPONSE);
      }
    });
  }, []);
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
  }, [selectedgroup, refreshall]);

  const gettext = (text: string | null): string => {
    return text ? text : "";
  };
  const passwordClick = (entry:IEntry): void => {
    let elementpass: HTMLElement | null = document.getElementById(
      `${entry._id}${entry.groupid}`
    );
    console.log(elementpass);
    if (elementpass !== null) {
      navigator.clipboard
        .writeText(gettext(entry.password))
        .then(() => console.log("ok"))
        .catch((e) => console.log("not ok"));
    }
  };

  const deletehandle = async (entryid: string): Promise<void> => {
    console.log(entryid);
    const response: DeleteEntryResponse = await DeleteUserEntry(entryid);
    if (response.status) {
      refreshgroupentities();
    }
  };

  const onmodalclose = (): void => {
    setrefreshmodalentry(!refreshmodalentry);
    seteditmodalopen(false);
  };

  const smallmodalclose = (): void => {
    setsmallmodalopen(false);
    setentrywithsmallbutton(EMPTYENTRYRESPONSE);
  };
  const onedithandle = (entryid: string): void => {
    setentrytoedit(entryid);
    seteditmodalopen(true);
  };

  const refreshentry: Function = (): void => {
    refreshgroupentities();
  };

  const moreClickHandle = (entry: IEntry): void => {
    setentrywithsmallbutton(entry);
    setsmallmodalopen(true);
  };
  return (
    <Container>
      <Modal
        visible={editmodalopen}
        onClose={onmodalclose}
        component={
          <NewEntryComponent
            refreshentry={refreshmodalentry}
            edit={true}
            editentryid={entrytoedit}
            refresh={refreshentry}
          />
        }
      />
      <Modal
        visible={smallmodalopen}
        onClose={smallmodalclose}
        component={
          <ModalButtonChoicer
            entry={entrywithsmallbutton}
            refreshgroupentities={refreshgroupentities}
            setentrytoedit={setentrytoedit}
            seteditmodalopen={seteditmodalopen}
            modalClose={smallmodalclose}
          />
        }
      />
      <TableContainer>
        <TableHead>
          <TableRow>
            <th>Title</th>
            <th>Username</th>
            <th>Password</th>
            <th>Note</th>
            <th></th>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry) => (
            <TableRow>
              <TableComponent>{entry.title}</TableComponent>
              <TableComponent>{entry.username}</TableComponent>
              <TableComponent
                id={`${entry._id}${entry.groupid}`}
                onClick={() => [passwordClick(entry)]}
                password
                placeholder='*****'
              >
                *****
              </TableComponent>
              <TableComponent>{entry.note}</TableComponent>
              <TableComponent>
                <TableButton
                  onClick={() => deletehandle(entry._id)}
                  color="lightblue"
                >
                  Delete
                </TableButton>
                <TableButton
                  color="lightgrey"
                  onClick={() => onedithandle(entry._id)}
                  style={{ marginLeft: ".4rem" }}
                >
                  Edit
                </TableButton>
                <MinButton onClick={() => moreClickHandle(entry)}>
                  More
                </MinButton>
              </TableComponent>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </Container>
  );
};

export default FieldsContainer;
