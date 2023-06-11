import { ActionFields } from "../../../hooks/actionFields.hook";
import { ModalButtonChoicer } from "../../MiniModal";
import Modal from "../../Modal";
import { AcceptModalComponent } from "../../Modal/AcceptModal";
import NewEntryComponent from "../../NewEntryComponent";
type FieldsModalProps = {
  actionFields: ActionFields;
  refreshEntry: Function;
  deleteAcceptHandle: (...args: any[]) => any;
  DeleteEntryModal: () => JSX.Element;
  refreshgroupentities: Function;
};
type EditEntryModalProps = {
  actionFields: ActionFields;
  refreshEntry: Function;
};
type DeleteEntryAcceptModalProps = {
  actionFields: ActionFields;
  deleteAcceptHandle: (...args: any[]) => any;
  DeleteEntryModal: () => JSX.Element;
};
type SmallModalButtonProps = {
  actionFields: ActionFields;
  refreshgroupentities: Function;
};
const EditEntryModal = ({
  actionFields,
  refreshEntry,
}: EditEntryModalProps): JSX.Element | null => {
  return actionFields.editModalOpen ? (
    <Modal
      visible={actionFields.editModalOpen}
      onClose={() => actionFields.setEditModalOpen(false)}
      component={
        <NewEntryComponent
          refreshentry={actionFields.refreshEntry}
          edit={true}
          editentryid={actionFields.entryToEdit}
          refresh={refreshEntry}
          closeModalDispatcherHandle={actionFields.setEditModalOpen}
        />
      }
    />
  ) : null;
};

const AcceptDeleteModal = ({
  actionFields,
  deleteAcceptHandle,
  DeleteEntryModal,
}: DeleteEntryAcceptModalProps): JSX.Element | null => {
  return actionFields.deleteModalOpen ? (
    <AcceptModalComponent
      visible={actionFields.deleteModalOpen}
      onClose={() => actionFields.setDeleteModalOpen(false)}
      acceptHandle={deleteAcceptHandle}
      component={DeleteEntryModal()}
    />
  ) : null;
};

const SmallButtonsModal = ({
  actionFields,
  refreshgroupentities,
}: SmallModalButtonProps): JSX.Element | null => {
  return actionFields.smallModalOpen ? (
    <Modal
      visible={actionFields.smallModalOpen}
      onClose={() => actionFields.setSmallModalOpen(false)}
      component={
        <ModalButtonChoicer
          entry={actionFields.entrywithsmallbutton}
          refreshgroupentities={refreshgroupentities}
          setentrytoedit={actionFields.setEntryToEdit}
          seteditmodalopen={actionFields.setEditModalOpen}
          modalClose={() => actionFields.setSmallModalOpen(false)}
        />
      }
    />
  ) : null;
};
export const FieldsModal = ({
  actionFields,
  refreshEntry,
  deleteAcceptHandle,
  DeleteEntryModal,
  refreshgroupentities,
}: FieldsModalProps): JSX.Element => {
  return (
    <div>
      <EditEntryModal actionFields={actionFields} refreshEntry={refreshEntry} />
      <AcceptDeleteModal
        actionFields={actionFields}
        deleteAcceptHandle={deleteAcceptHandle}
        DeleteEntryModal={DeleteEntryModal}
      />
      <SmallButtonsModal
        actionFields={actionFields}
        refreshgroupentities={refreshgroupentities}
      />
    </div>
  );
};
