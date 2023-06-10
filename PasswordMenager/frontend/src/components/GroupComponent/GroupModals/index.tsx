import { ActionGroup } from "../../../hooks/actionGroups.hook";
import Modal from "../../Modal/";
import { AcceptModalComponent } from "../../Modal/AcceptModal";

type GroupModalProps = {
  actionGroup: ActionGroup;
  newGroupCloseHandle: () => void;
  newGroupComponent: JSX.Element;
};

const AcceptDeleteModal = () => <div>Are you sure to delete group</div>;
export const GroupsModal = ({
  actionGroup,
  newGroupCloseHandle,
  newGroupComponent,
}: GroupModalProps): JSX.Element => {
  return (
    <div>
      {actionGroup.createModal ? (
        <Modal
          visible={actionGroup.createModal}
          onClose={newGroupCloseHandle}
          component={newGroupComponent}
        />
      ) : null}
      {actionGroup.deleteModal ? (
        <AcceptModalComponent
          visible={actionGroup.deleteModal}
          onClose={() => actionGroup.setDeleteModal(false)}
          acceptHandle={() => {}}
          component={<AcceptDeleteModal />}
        />
      ) : null}
    </div>
  );
};
