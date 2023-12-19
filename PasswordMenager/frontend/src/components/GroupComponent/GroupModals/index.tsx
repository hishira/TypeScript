import CreateModal from "./modals/createModal";
import DeleteModal from "./modals/deleteModal";
import { EditModal } from "./modals/editModal";
import { GroupModalProps } from "./types";

export const GroupsModal = ({
  actionGroup,
  newGroupCloseHandle,
  setRefetch,
}: GroupModalProps): JSX.Element => {
  return (
    <div>
      <CreateModal
        actionGroup={actionGroup}
        newGroupCloseHandle={newGroupCloseHandle}
        setRefetch={setRefetch}
      />
      <DeleteModal actionGroup={actionGroup} setRefetch={setRefetch} />
      <EditModal actionGroup={actionGroup} setRefetch={setRefetch} />
    </div>
  );
};
