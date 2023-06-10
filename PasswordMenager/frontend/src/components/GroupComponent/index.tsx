import React, { useState } from "react";
import { GroupEffect } from "../../hooks/groups.hook";
import { Group } from "../../utils/group.utils";
import IconButton from "../IconButton";
import Modal from "../Modal/";
import { PlusComponent } from "../icons/PlusIcon";
import { GroupsComponent } from "./Groups";
import NewGroupComponent from "./NewGroupComponent";
import { ButtonContainer, Category, Container } from "./component.styled";
import { ActionGroupHooks } from "../../hooks/actionGroups.hook";
import { GroupsModal } from "./GroupModals";

const GroupComponent = ({ selectgrouphandle }: GroupComponentProps) => {
  const [groupdto, setgroupdto] = useState<CreateGroup>({ name: "" });
  const [refetch, setRefetch] = useState(false);
  const groupAction = ActionGroupHooks();

  const groups = GroupEffect(refetch);
  const [selectedgroup, setselectedgroup] = useState<string>("");
  const clickHandle = (): void => {
    groupAction.setCreateModal(true);
  };

  const NewGroupComponenet = (): JSX.Element => (
    <NewGroupComponent
      func={(e: React.ChangeEvent<HTMLInputElement>) =>
        setgroupdto({ name: e.target.value })
      }
      buttonhandle={buttonHandleClick}
      isButtonDisabled={groupdto.name === ""}
    />
  );

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

  const ongroupclick: Function = (group: IGroup): void => {
    selectgrouphandle(group._id);
    setselectedgroup(group._id);
  };

  const closeHandle = (): void => groupAction.setCreateModal(false);
  return (
    <Container>
      <GroupsModal
        actionGroup={groupAction}
        newGroupCloseHandle={closeHandle}
        newGroupComponent={NewGroupComponenet()}
      />
      <Category>
        <div>Categories</div>
        <IconButton onClick={()=>groupAction.setCreateModal(false)}>
          <PlusComponent></PlusComponent>
        </IconButton>
      </Category>
      <GroupsComponent
        groups={groups}
        ongroupclick={ongroupclick}
        selectedgroup={selectedgroup}
        deleteHandle={() => groupAction.setDeleteModal(true)}
        editHandle={() => groupAction.setEditModal(true)}
      />
      <ButtonContainer></ButtonContainer>
    </Container>
  );
};

export default GroupComponent;
