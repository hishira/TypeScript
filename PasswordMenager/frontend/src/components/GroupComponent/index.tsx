import React, { useState } from "react";
import { ActionGroupHooks } from "../../hooks/actionGroups.hook";
import { GroupEffect } from "../../hooks/groups.hook";
import { Group } from "../../utils/group.utils";
import IconButton from "../IconButton";
import { PlusComponent } from "../icons/PlusIcon";
import { GroupsModal } from "./GroupModals";
import { GroupsComponent } from "./Groups";
import NewGroupComponent from "./NewGroupComponent";
import { ButtonContainer, Category, Container } from "./component.styled";

type NewGroupComponentProps = {
  setgroupdto: React.Dispatch<React.SetStateAction<CreateGroup>>;
  buttonHandleClick: () => void;
  groupdto: CreateGroup;
};
const NewGroupComponenet = ({
  setgroupdto,
  buttonHandleClick,
  groupdto,
}: NewGroupComponentProps): JSX.Element => (
  <NewGroupComponent
    func={(e: React.ChangeEvent<HTMLInputElement>) =>
      setgroupdto({ name: e.target.value })
    }
    buttonhandle={buttonHandleClick}
    isButtonDisabled={groupdto.name === ""}
  />
);
const GroupComponent = ({ selectgrouphandle }: GroupComponentProps) => {
  const [groupdto, setgroupdto] = useState<CreateGroup>({ name: "" });
  const [refetch, setRefetch] = useState(false);
  const groupAction = ActionGroupHooks();

  const groups = GroupEffect(refetch);
  const [selectedgroup, setselectedgroup] = useState<string>("");

  //TODO fix

  const buttonHandleClick = async (): Promise<void> => {
    Group.getInstance()
      .CreateGroupForUser(groupdto)
      .then((resp) => {
        setRefetch(!refetch);
        groupAction.setCreateModal(false);
        setgroupdto({ name: "" });
      })
      .catch((_) => {});
  };

  const deleteClickHandle = () => {
    Group.getInstance()
      .DeleteUserGroup(groupAction.actionGroupId)
      .then((response) => {
        setRefetch(!refetch);
        groupAction.setDeleteModal(false);
      })
      .catch((e) => groupAction.setDeleteModal(false));
  };

  const ongroupclick: Function = (group: IGroup): void => {
    selectgrouphandle(group._id);
    setselectedgroup(group._id);
  };

  const editHandle = (groupId: string): void => {
    groupAction.setEditModal(true);
    groupAction.setActionGroupid(groupId);
  };

  const deleteHandle = (groupId: string): void => {
    groupAction.setDeleteModal(true);
    groupAction.setActionGroupid(groupId);
  };

  const editGroupHandle = (groupName: string): void => {
    Group.getInstance()
      .EditUserGroup(groupAction.actionGroupId, {
        name: groupName,
      })
      .then((response) => {
        setRefetch(!refetch);
        groupAction.setEditModal(false);
      })
      .catch((e) => e && console.error(e));
  };
  const closeHandle = (): void => groupAction.setCreateModal(false);
  return (
    <Container>
      <GroupsModal
        actionGroup={groupAction}
        newGroupCloseHandle={closeHandle}
        newGroupComponent={NewGroupComponenet({
          setgroupdto,
          buttonHandleClick,
          groupdto,
        })}
        deleteHandle={deleteClickHandle}
        editHandle={editGroupHandle}
      />
      <Category>
        <div>Categories</div>
        <IconButton onClick={() => groupAction.setCreateModal(true)}>
          <PlusComponent></PlusComponent>
        </IconButton>
      </Category>
      <GroupsComponent
        groups={groups}
        ongroupclick={ongroupclick}
        selectedgroup={selectedgroup}
        deleteHandle={deleteHandle}
        editHandle={editHandle}
      />
      <ButtonContainer></ButtonContainer>
    </Container>
  );
};

export default GroupComponent;
