import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import { ActionGroupHooks } from "../../hooks/actionGroups.hook";
import { GroupEffect } from "../../hooks/groups.hook";
import { IGeneral } from "../../models/General";
import { Group } from "../../utils/group.utils";
import { ErrorPopUpObject, SuccessPopUpObject } from "../../utils/popup.utils";
import IconButton from "../IconButton";
import { Translation, TranslationFunction } from "../Translation";
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
const GroupComponent = ({
  selectgrouphandle,
  store,
}: GroupComponentProps & { store?: IGeneral }) => {
  const [groupdto, setgroupdto] = useState<CreateGroup>({ name: "" });
  const [refetch, setRefetch] = useState(false);
  const groupAction = ActionGroupHooks();

  const groups = GroupEffect(refetch);
  const [selectedgroup, setselectedgroup] = useState<string>("");
  const successCreateGroupMessage = TranslationFunction(
    "group.createToast.success"
  );
  const errorCreateGroupMessage = TranslationFunction(
    "group.createToast.error"
  );
  const successEditGroupMessage = TranslationFunction(
    "group.editToast.success"
  );
  const errorEditGroupMessage = TranslationFunction("group.editToast.error");
  const successDeleteGroupMessage = TranslationFunction(
    "group.deleteToast.success"
  );
  const errorDeleteGroupMessage = TranslationFunction(
    "group.deleteToast.error"
  );
  //TODO fix

  const buttonHandleClick = async (): Promise<void> => {
    Group.getInstance()
      .CreateGroupForUser(groupdto)
      .then((resp) => {
        setRefetch(!refetch);
        groupAction.setCreateModal(false);
        setgroupdto({ name: "" });
        store?.setPopUpinfo(SuccessPopUpObject(successCreateGroupMessage));
      })
      .catch((_) => {
        store?.setPopUpinfo(ErrorPopUpObject(errorCreateGroupMessage));
      });
  };

  const deleteClickHandle = () => {
    Group.getInstance()
      .DeleteUserGroup(groupAction.actionGroupId)
      .then((response) => {
        setRefetch(!refetch);
        groupAction.setDeleteModal(false);
        store?.setPopUpinfo(SuccessPopUpObject(successDeleteGroupMessage));
      })
      .catch((e) => {
        store?.setPopUpinfo(ErrorPopUpObject(errorDeleteGroupMessage));
        groupAction.setDeleteModal(false);
      });
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
        store?.setPopUpinfo(SuccessPopUpObject(successEditGroupMessage));
      })
      .catch((e) => {
        e && console.error(e);
        store?.setPopUpinfo(ErrorPopUpObject(errorEditGroupMessage));
      });
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
