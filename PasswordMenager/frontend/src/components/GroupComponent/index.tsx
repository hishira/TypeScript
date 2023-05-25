import React, { useState } from "react";
import { GroupEffect } from "../../hooks/groups.hook";
import { Group } from "../../utils/group.utils";
import Button from "../Button";
import Modal from "../Modal/";
import NewGroupComponent from "./NewGroupComponent";
import {
  ButtonContainer,
  Container,
  GroupContainer,
  Groups,
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
    console.log(groupdto.name);
    Group.getInstance()
      .CreateGroupForUser(groupdto)
      .then((resp) => {
        setRefetch(!refetch);
        setModal(false);
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
            />
          }
        />
      ) : null}
      <Groups>
        {groups.map((group: IGroup) => (
          <GroupContainer
            key={group._id}
            {...(selectedgroup === group._id && {
              style: { backgroundColor: "lightslategrey" },
            })}
            onClick={() => ongroupclick(group)}
          >
            {group.name}
          </GroupContainer>
        ))}
      </Groups>
      <ButtonContainer>
        <Button onClick={clickHandle} color="lightblue">
          Add new group
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default GroupComponent;
