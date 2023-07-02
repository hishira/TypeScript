import { FieldsActionHook } from "../../hooks/actionFields.hook";
import { PasswordEntries } from "../../hooks/password-entries.hook";
import { ResizeWindowsHandle } from "../../hooks/resize.hook";
import { Entry } from "../../utils/entry.utils";
import { PasswordTableComponent } from "../PasswordTable";
import { FieldsModal } from "./FieldsModal";
import { Container } from "./component.styled";

export const DeleteEntryModal = () => <div>Are you sure to delete entry?</div>;
const FieldsContainer = ({
  selectedgroup,
  refreshgroupentities,
  refreshall,
}: FieldsComponentType): JSX.Element => {
  const entries = PasswordEntries(selectedgroup, refreshall);
  const FieldsAction = FieldsActionHook();
  ResizeWindowsHandle(
    FieldsAction.setSmallModalOpen,
    FieldsAction.setentrywithsmallbutton
  );

  const acceptDeleteHandle = () => {
    Entry.getInstance()
      .DeleteUserEntry(FieldsAction.entryToDelete)
      .then((response) => {
        if (response.status) {
          refreshgroupentities();
          FieldsAction.setDeleteModalOpen(false);
        }
      })
      .catch((e) => e && console.error(e));
  };
  const deletehandle = async (entryid: string): Promise<void> => {
    FieldsAction.setEntryToDelete(entryid);
    FieldsAction.setDeleteModalOpen(true);
  };

  const onedithandle = (entryid: string): void => {
    FieldsAction.setEntryToEdit(entryid);
    FieldsAction.setEditModalOpen(true);
  };

  const refreshentry: Function = (): void => {
    refreshgroupentities();
  };

  const moreClickHandle = (entry: IEntry): void => {
    FieldsAction.setentrywithsmallbutton(entry);
    FieldsAction.setSmallModalOpen(true);
  };

  return (
    <Container>
      <FieldsModal
        actionFields={FieldsAction}
        refreshEntry={refreshentry}
        deleteAcceptHandle={acceptDeleteHandle}
        DeleteEntryModal={DeleteEntryModal}
        refreshgroupentities={refreshgroupentities}
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
