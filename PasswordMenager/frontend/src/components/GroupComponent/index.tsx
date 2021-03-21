import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import Modal from "../Modal/";
import FormElement from "../FormElement/";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30%;
  border-right: 0.1rem solid slategray;
`;
const Groups = styled.div`
  height: 100%;
  max-height: 100%;
  overflow: auto;
  border: 2px solid red;
  scroll-behavior: smooth;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 2px solid purple;
  padding: 1rem;
  box-sizing: border-box;
`;

const NewGroup = styled.div`
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  border: 2px solid purple;
  width: 100%;
 `;
 
type ModalComponentProps = {
  func: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonhandle: ()=>void
};

const ComponentToModal = ({ func,buttonhandle }: ModalComponentProps): JSX.Element => {
  return (
    <NewGroup>
      <FormElement
        label="Group name"
        inputtype="text"
        inputplaceholder="name"
        inputChange={func}
      />
      <Button onClick={buttonhandle} color="lightblue" >Add group</Button>
    </NewGroup>
  );
};
const GroupComponent = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [groupname, setgroupname] = useState<string>("string");
  
  const clickHandle = (): void => {
    setModal(true);
  };
  
  const buttonHandleClick = ()=>{
    console.log(groupname);
  };
  
  const closeHandle = ():void=>setModal(false);
  return (
    <Container>
      <Modal
        visible={modal}
        onClose={closeHandle}
        component={
          <ComponentToModal
            func={(e: React.ChangeEvent<HTMLInputElement>) =>
              setgroupname(e.target.value)
            }
            buttonhandle={buttonHandleClick}
          />
        }
      />
      <Groups></Groups>
      <ButtonContainer>
        <Button onClick={clickHandle} color="lightblue">
          Add new group
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default GroupComponent;
