import { AcceptDeleteModal } from "./acceptDeleteModal";
import { EditEntryModal } from "./editEntryModal";
import { SmallButtonsModal } from "./smallButtonsModal";
import { FieldsModalProps } from "./types";

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
