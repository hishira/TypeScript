import { inject, observer } from "mobx-react";
import { FieldsActionHook } from "../../hooks/actionFields.hook";
import { ResizeWindowsHandle } from "../../hooks/resize.hook";
import { IGeneral } from "../../models/General";
import { Entry } from "../../utils/entry.utils";
import { PasswordTableComponent } from "../PasswordTable";
import { Translation } from "../Translation";
import { TitleContainer } from "../shared/styled-components";
import { FieldsModal } from "./FieldsModal";
import {
  Container,
  DeleteModalContainer,
  DeleteModalContent,
} from "./component.styled";

export const DeleteEntryModal = () => (
  <DeleteModalContainer>
    <TitleContainer>{Translation("delete.entry.modal.title")}</TitleContainer>
    <DeleteModalContent>
      {Translation("deleteentry.question")}
    </DeleteModalContent>
  </DeleteModalContainer>
);
const ProperDeletedEntryMessage = {
  open: true,
  type: "success",
  message: "Entry deleted succesfull",
};
const ErrorDeletedEntryMessage = {
  open: true,
  type: "error",
  message: "Error occur when entry deleted",
};
const FieldsContainer = ({
  refreshgroupentities,
  passwords,
  store,
}: FieldsComponentType & { store?: IGeneral }): JSX.Element => {
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
          store?.setPopUpinfo(ProperDeletedEntryMessage);
        }
      })
      .catch((e) => {
        e && console.error(e);
        store?.setPopUpinfo(ErrorDeletedEntryMessage);
      });
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
        entries={passwords}
        deletehandle={deletehandle}
        onedithandle={onedithandle}
        moreClickHandle={moreClickHandle}
      />
    </Container>
  );
};

export default inject("store")(observer(FieldsContainer));
