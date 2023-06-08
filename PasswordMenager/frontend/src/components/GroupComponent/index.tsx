import React, { useState } from "react";
import { GroupEffect } from "../../hooks/groups.hook";
import { Group } from "../../utils/group.utils";
import IconButton from "../IconButton";
import Modal from "../Modal/";
import { PlusComponent } from "../icons/PlusIcon";
import { GroupsComponent } from "./Groups";
import NewGroupComponent from "./NewGroupComponent";
import {
  ButtonContainer,
  Category,
  Container
} from "./component.styled";

const GroupComponent = ({ selectgrouphandle }: GroupComponentProps) => {
  const [modal, setModal] = useState<boolean>(false);
  const [groupdto, setgroupdto] = useState<CreateGroup>({ name: "" });
  const [refetch, setRefetch] = useState(false);
  const groups = GroupEffect(refetch);
  const [selectedgroup, setselectedgroup] = useState<string>("");
  const clickHandle = (): void => {
    setModal(true);
  };

  const buttonHandleClick = async (): Promise<void> => {
    Group.getInstance()
      .CreateGroupForUser(groupdto)
      .then((resp) => {
        setRefetch(!refetch);
        setModal(false);
        setgroupdto({ name: "" });
      });
  };

  const ongroupclick: Function = (group: IGroup): void => {
    selectgrouphandle(group._id);
    setselectedgroup(group._id);
  };
  const closeHandle = (): void => setModal(false);
  return (
    <Container>
      {modal ? (
        <Modal
          visible={modal}
          onClose={closeHandle}
          component={
            <NewGroupComponent
              func={(e: React.ChangeEvent<HTMLInputElement>) =>
                setgroupdto({ name: e.target.value })
              }
              buttonhandle={buttonHandleClick}
              isButtonDisabled={groupdto.name === ""}
            />
          }
        />
      ) : null}
      <Category>
        <div>Categories</div>
        <IconButton onClick={clickHandle}>
          <PlusComponent></PlusComponent>
        </IconButton>
      </Category>
      <GroupsComponent
        groups={groups}
        ongroupclick={ongroupclick}
        selectedgroup={selectedgroup}
      />
      <ButtonContainer></ButtonContainer>
    </Container>
  );
};

export default GroupComponent;
