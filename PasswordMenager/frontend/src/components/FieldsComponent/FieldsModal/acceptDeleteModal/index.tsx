import { AcceptModalComponent } from "../../../Modal/AcceptModal";
import { DeleteEntryAcceptModalProps } from "../types";

export const AcceptDeleteModal = ({
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
