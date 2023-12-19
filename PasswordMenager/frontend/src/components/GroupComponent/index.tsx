import { inject, observer } from "mobx-react";
import { useState } from "react";
import { ActionGroupHooks } from "../../hooks/actionGroups.hook";
import { GroupEffect } from "../../hooks/groups.hook";
import IconButton from "../IconButton";
import { Translation } from "../Translation";
import { PlusComponent } from "../icons/PlusIcon";
import { GroupsModal } from "./GroupModals";
import { GroupsComponent } from "./Groups";
import { ButtonContainer, Category, Container } from "./component.styled";

const GroupComponent = ({ selectgrouphandle }: GroupComponentProps) => {
  const [refetch, setRefetch] = useState(false);
  const groupAction = ActionGroupHooks();

  const groups = GroupEffect(refetch);
  const [selectedgroup, setSelectedGroup] = useState<string>("");

  const ongroupclick: Function = (group: IGroup): void => {
    selectgrouphandle(group._id);
    setSelectedGroup(group._id);
  };

  const editHandle = (groupId: string): void => {
    groupAction.setEditModal(true);
    groupAction.setActionGroupid(groupId);
  };

  const deleteHandle = (groupId: string): void => {
    groupAction.setDeleteModal(true);
    groupAction.setActionGroupid(groupId);
  };

  const closeHandle = (): void => groupAction.setCreateModal(false);
  return (
    <Container>
      <GroupsModal
        actionGroup={groupAction}
        newGroupCloseHandle={closeHandle}
        setRefetch={setRefetch}
      />
      <Category>
        <div>{Translation("groups.view.title")}</div>
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

export default inject("store")(observer(GroupComponent));
