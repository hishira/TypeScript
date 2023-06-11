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
import { AcceptModalComponent } from "../Modal/AcceptModal";

//TODO: Refactor, like in group component create modal component for modals view
const DeleteEntryModal = () => <div>Are you sure to delete entry?</div>;
const FieldsContainer = ({
  selectedgroup,
  refreshgroupentities,
  refreshall,
}: FieldsComponentType): JSX.Element => {
  const entries = PasswordEntries(selectedgroup, refreshall);
  const [editmodalopen, seteditmodalopen] = useState<boolean>(false);
  const [entrytoedit, setentrytoedit] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [entryToDelete, setEntryToDelete] = useState<string>("");
  const [refreshmodalentry, setrefreshmodalentry] = useState<boolean>(false);
  const [smallmodalopen, setsmallmodalopen] = useState<boolean>(false);
  const [entrywithsmallbutton, setentrywithsmallbutton] =
    useState<IEntry>(EMPTYENTRYRESPONSE);

  ResizeWindowsHandle(setsmallmodalopen, setentrywithsmallbutton);

  const acceptDeleteHandle = () => {
    Entry.getInstance()
      .DeleteUserEntry(entryToDelete)
      .then((response) => {
        if (response.status) {
          refreshgroupentities();
          setDeleteModalOpen(false);
        }
      })
      .catch((e) => e && console.error(e));
  };
  const deletehandle = async (entryid: string): Promise<void> => {
    setEntryToDelete(entryid);
    setDeleteModalOpen(true);
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
      {editmodalopen ? (
        <Modal
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
        />
      ) : null}
      {deleteModalOpen ? (
        <AcceptModalComponent
          visible={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          acceptHandle={acceptDeleteHandle}
          component={DeleteEntryModal()}
        />
      ) : null}
      {smallmodalopen ? (
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
      ) : null}
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
