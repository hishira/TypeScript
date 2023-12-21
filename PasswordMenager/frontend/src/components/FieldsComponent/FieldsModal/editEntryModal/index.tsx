import Modal from "../../../Modal";
import NewEntryComponent from "../../../NewEntryComponent";
import { EditEntryModalProps } from "../types";

export const EditEntryModal = ({
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
