import { CreateModal } from "./modals/createModal";
import { DeleteModal } from "./modals/deleteModal";
import { EditModal } from "./modals/editModal";
import { GroupModalProps } from "./types";

export const GroupsModal = ({
  actionGroup,
  newGroupCloseHandle,
  newGroupComponent,
  deleteHandle,
  editHandle,
}: GroupModalProps): JSX.Element => {
  return (
    <div>
      <CreateModal
        actionGroup={actionGroup}
        newGroupCloseHandle={newGroupCloseHandle}
        newGroupComponent={newGroupComponent}
      />
      <DeleteModal actionGroup={actionGroup} deleteHandle={deleteHandle} />
      <EditModal actionGroup={actionGroup} editHandle={editHandle} />
    </div>
  );
};
