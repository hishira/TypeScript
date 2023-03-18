import { useState } from "react";
import { PasswordEntries } from "../../hooks/password-entries.hook";
import { ResizeWindowsHandle } from "../../hooks/resize.hook";
import { EMPTYENTRYRESPONSE } from "../../utils/constans.utils";
import { Entry } from "../../utils/entry.utils";
import { ModalButtonChoicer } from "../MiniModal";
import Modal from "../Modal";
import NewEntryComponent from "../NewEntryComponent";
import { PasswordTableComponent } from "../PasswordTable";
import { Container } from "./component.styled";

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
    const response: DeleteEntryResponse =
      await Entry.getInstance().DeleteUserEntry(entryid);
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
      {editmodalopen ? <Modal
        visible={editmodalopen}
        onClose={onmodalclose}
        component={
          <NewEntryComponent
            refreshentry={refreshmodalentry}
            edit={true}
            editentryid={entrytoedit}
            refresh={refreshentry}
            closeModalDispatcherHandle={seteditmodalopen}
          />
        }
      /> : null}
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
        moreClickHandle={moreClickHandle}
      />
    </Container>
  );
};

export default FieldsContainer;
