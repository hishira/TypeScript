import { ModalButtonChoicer } from "../../../MiniModal";
import Modal from "../../../Modal";
import { SmallModalButtonProps } from "../types";

export const SmallButtonsModal = ({
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
