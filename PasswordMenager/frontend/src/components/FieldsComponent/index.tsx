import { useState } from "react";
import { PasswordEntries } from "../../hooks/password-entries.hook";
import { ResizeWindowsHandle } from "../../hooks/resize.hook";
import { EMPTYENTRYRESPONSE } from "../../utils/constans.utils";
import { DeleteUserEntry } from "../../utils/entry.utils";
import { ModalButtonChoicer } from "../MiniModal";
import Modal from "../Modal";
import NewEntryComponent from "../NewEntryComponent";
import {
  Container,
  MinButton,
  TableBody,
  TableButton,
  TableComponent,
  TableContainer,
  TableHead,
  TableRow,
} from "./component.styled";

const PasswordFieldsHelper = {
  gettext: (text: string | null): string => {
    return text ? text : "";
  },
  passwordClick: (entry: IEntry): void => {
    let elementpass: HTMLElement | null = document.getElementById(
      `${entry._id}${entry.groupid}`
    );
    console.log(elementpass);
    if (elementpass !== null) {
      navigator.clipboard
        .writeText(PasswordFieldsHelper.gettext(entry.password))
        .then(() => console.log("ok"))
        .catch((e) => console.log("not ok"));
    }
  },
};

type PassTableProp = {
  entries: IEntry[],
  deletehandle: any,
  onedithandle: any,
  moreClickHandle: any,
}
const PasswordTableComponent = ({
  entries,
  deletehandle,
  onedithandle,
  moreClickHandle,
}: PassTableProp): JSX.Element => {
  
  return <TableContainer>
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
      <TableRow key={entry._id}>
        <TableComponent>{entry.title}</TableComponent>
        <TableComponent>{entry.username}</TableComponent>
        <TableComponent
          id={`${entry._id}${entry.groupid}`}
          onClick={() => [PasswordFieldsHelper.passwordClick(entry)]}
          password
          placeholder="*****"
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
}
const FieldsContainer = ({
  selectedgroup,
  refreshgroupentities,
  refreshall,
}: FieldsComponentType): JSX.Element => {
  const entries = PasswordEntries(selectedgroup, refreshall);
  const [editmodalopen, seteditmodalopen] = useState<boolean>(false);
  const [entrytoedit, setentrytoedit] = useState<string>("");
  const [refreshmodalentry, setrefreshmodalentry] = useState<boolean>(false);
  const [smallmodalopen, setsmallmodalopen] = useState<boolean>(false);
  const [entrywithsmallbutton, setentrywithsmallbutton] =
    useState<IEntry>(EMPTYENTRYRESPONSE);

  ResizeWindowsHandle(setsmallmodalopen, setentrywithsmallbutton);

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
      <PasswordTableComponent
        entries={entries}
        deletehandle={deletehandle}
        onedithandle={onedithandle}
        moreClickHandle={moreClickHandle}/>
    </Container>
  );
};

export default FieldsContainer;
