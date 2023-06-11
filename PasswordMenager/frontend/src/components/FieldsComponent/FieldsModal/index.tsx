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
export const FieldsModal = ({
  actionFields,
  refreshEntry,
  deleteAcceptHandle,
  DeleteEntryModal,
  refreshgroupentities,
}: FieldsModalProps): JSX.Element => {
  return (
    <div>
      {actionFields.editModalOpen ? (
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
      ) : null}
      {actionFields.deleteModalOpen ? (
        <AcceptModalComponent
          visible={actionFields.deleteModalOpen}
          onClose={() => actionFields.setDeleteModalOpen(false)}
          acceptHandle={deleteAcceptHandle}
          component={DeleteEntryModal()}
        />
      ) : null}
      {actionFields.smallModalOpen ? (
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
      ) : null}
    </div>
  );
};
