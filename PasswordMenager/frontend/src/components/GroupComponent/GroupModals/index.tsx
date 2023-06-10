import { ActionGroup } from "../../../hooks/actionGroups.hook";
import Modal from "../../Modal/";
import { AcceptModalComponent } from "../../Modal/AcceptModal";
import { AcceptModalContainer } from "./component.styled";

type GroupModalProps = {
  actionGroup: ActionGroup;
  newGroupCloseHandle: () => void;
  newGroupComponent: JSX.Element;
  deleteHandle: ()=>void,
};

const AcceptDeleteModal = () => (
  <AcceptModalContainer>Are you sure to delete group</AcceptModalContainer>
);
export const GroupsModal = ({
  actionGroup,
  newGroupCloseHandle,
  newGroupComponent,
  deleteHandle,
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
          acceptHandle={deleteHandle}
          component={<AcceptDeleteModal />}
        />
      ) : null}
    </div>
  );
};
