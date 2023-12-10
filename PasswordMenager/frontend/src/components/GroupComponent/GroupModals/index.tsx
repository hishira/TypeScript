import { ActionGroup } from "../../../hooks/actionGroups.hook";
import Modal from "../../Modal/";
import { AcceptModalComponent } from "../../Modal/AcceptModal";
import { AcceptModalContainer } from "./component.styled";
import FormElement from "./../../FormElement/index";
import { useState } from "react";
import { TranslationFunction } from "../../Translation";

// TODO: Refactor types and components
type GroupModalProps = {
  actionGroup: ActionGroup;
  newGroupCloseHandle: () => void;
  newGroupComponent: JSX.Element;
  deleteHandle: () => void;
  editHandle: (groupName: string) => void;
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
  editHandle: (value: string) => void;
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

const EditModal = ({ actionGroup, editHandle }: EditModalType) => {
  const [groupName, setGroupName] = useState<string>("");
  const closeHandle = () => {
    actionGroup.setEditModal(false);
    setGroupName("");
  };
  return actionGroup.editModal ? (
    <AcceptModalComponent
      visible={actionGroup.editModal}
      onClose={() => closeHandle()}
      acceptHandle={() => editHandle(groupName)}
      disableButton={groupName === ""}
      component={
        <AcceptEditModal newName={groupName} setNewName={setGroupName} />
      }
    />
  ) : null;
};
const AcceptDeleteModal = () => (
  <AcceptModalContainer>
    {TranslationFunction("group.action.delete")}
  </AcceptModalContainer>
);
type AceptEditModalProps = {
  newName: string;
  setNewName: React.Dispatch<React.SetStateAction<string>>;
};
const AcceptEditModal = ({ newName, setNewName }: AceptEditModalProps) => {
  return (
    <AcceptModalContainer>
      <FormElement
        label={"groups.groupsmodal.newgroupname"}
        inputplaceholder="groups.groupsmodal.newgroupname"
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
