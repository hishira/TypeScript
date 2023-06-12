import { ActionGroup } from "../../../hooks/actionGroups.hook";
import Modal from "../../Modal/";
import { AcceptModalComponent } from "../../Modal/AcceptModal";
import { AcceptModalContainer } from "./component.styled";
import FormElement from "./../../FormElement/index";
import { useState } from "react";

type GroupModalProps = {
  actionGroup: ActionGroup;
  newGroupCloseHandle: () => void;
  newGroupComponent: JSX.Element;
  deleteHandle: () => void;
};
type CreateModalType = {
  actionGroup: ActionGroup;
  newGroupCloseHandle: () => void;
  newGroupComponent: JSX.Element;
};
type DeleteModalType = {
  actionGroup: ActionGroup;
  deleteHandle: () => void;
};
type EditModalType = {
  actionGroup: ActionGroup;
  editHandle: () => void;
};
const CreateModal = ({
  actionGroup,
  newGroupCloseHandle,
  newGroupComponent,
}: CreateModalType) =>
  actionGroup.createModal ? (
    <Modal
      visible={actionGroup.createModal}
      onClose={newGroupCloseHandle}
      component={newGroupComponent}
    />
  ) : null;

const DeleteModal = ({ actionGroup, deleteHandle }: DeleteModalType) =>
  actionGroup.deleteModal ? (
    <AcceptModalComponent
      visible={actionGroup.deleteModal}
      onClose={() => actionGroup.setDeleteModal(false)}
      acceptHandle={deleteHandle}
      component={<AcceptDeleteModal />}
    />
  ) : null;

const EditModal = ({ actionGroup, editHandle }: EditModalType) =>
  actionGroup.editModal ? (
    <AcceptModalComponent
      visible={actionGroup.editModal}
      onClose={() => actionGroup.setEditModal(false)}
      acceptHandle={editHandle}
      component={<AcceptEditModal />}
    />
  ) : null;
const AcceptDeleteModal = () => (
  <AcceptModalContainer>Are you sure to delete group</AcceptModalContainer>
);
const AcceptEditModal = () => {
  const [newName, setNewName] = useState<string>("");
  return (
    <AcceptModalContainer>
      <FormElement
        label={"New group name"}
        inputplaceholder="New group name"
        inputChange={(e) => setNewName(e.target.value)}
        inputtype="txt"
        value={newName}
      />
    </AcceptModalContainer>
  );
};
export const GroupsModal = ({
  actionGroup,
  newGroupCloseHandle,
  newGroupComponent,
  deleteHandle,
}: GroupModalProps): JSX.Element => {
  return (
    <div>
      <CreateModal
        actionGroup={actionGroup}
        newGroupCloseHandle={newGroupCloseHandle}
        newGroupComponent={newGroupComponent}
      />
      <DeleteModal actionGroup={actionGroup} deleteHandle={deleteHandle} />
      <EditModal actionGroup={actionGroup} editHandle={deleteHandle} />
    </div>
  );
};
