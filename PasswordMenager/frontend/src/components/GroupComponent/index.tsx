import React, { useState, useEffect } from "react";
import Button from "../Button";
import Modal from "../Modal/";
import FormElement from "../FormElement/";
import { GetGroupsByUser, CreateGroupForUser } from "../../utils/group.utils";
import { ButtonContainer, Container, GroupContainer, Groups, NewGroup } from "./component.styled";

type ModalComponentProps = {
  func: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonhandle: () => void;
};

const ComponentToModal = ({
  func,
  buttonhandle,
}: ModalComponentProps): JSX.Element => {
  return (
    <NewGroup>
      <FormElement
        label="Group name"
        inputtype="text"
        inputplaceholder="name"
        inputChange={func}
      />
      <Button onClick={buttonhandle} color="lightblue">
        Add group
      </Button>
    </NewGroup>
  );
};
const GroupComponent = ({ selectgrouphandle }: GroupComponentProps) => {
  const [modal, setModal] = useState<boolean>(false);
  const [groupdto, setgroupdto] = useState<CreateGroup>({ name: "" });
  const [groups, setgroup] = useState<Array<IGroup>>([]);
  const [selectedgroup, setselectedgroup] = useState<string>("");
  const clickHandle = (): void => {
    setModal(true);
  };

  const buttonHandleClick = async (): Promise<void> => {
    console.log(groupdto.name);
    const response: CreateGroupResponse = await CreateGroupForUser(groupdto);
    console.log(response.response.name);
  };

  const fetchGroups = async (): Promise<void> => {
    const groupresponse: GroupResponse = await GetGroupsByUser();
    setgroup(groupresponse.response);
    console.log(groupresponse.response);
  };
  useEffect(() => {
    fetchGroups();
  }, []);

  const ongroupclick: Function = (group: IGroup): void => {
    selectgrouphandle(group._id);
    setselectedgroup(group._id);
  };
  const closeHandle = (): void => setModal(false);
  return (
    <Container>
      <Modal
        visible={modal}
        onClose={closeHandle}
        component={
          <ComponentToModal
            func={(e: React.ChangeEvent<HTMLInputElement>) =>
              setgroupdto({ name: e.target.value })
            }
            buttonhandle={buttonHandleClick}
          />
        }
      />
      <Groups>
        {groups.map((group: IGroup) => (
          <GroupContainer
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
