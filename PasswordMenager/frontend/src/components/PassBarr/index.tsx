import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import Modal from "../Modal/";
import FormElement from "../FormElement/";
import NewEntryComponent from "../NewEntryComponent/index";
const Container = styled.div`
  display: flex;
  padding: 5px;
  & > *:not(:first-child) {
    margin-left: 15px;
  }
`;

const EntryModalComponent = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 5px;
  width: 100%;
`;
const PassLen = styled.div`
  font-size: ".9rem";
`;
const SectionContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;
const CheckBox = styled.input`
  transform: translate(0%, 175%);
`;

const PassBar = (): JSX.Element => {
  const [modalopen, setmodalopen] = useState<boolean>(false);
  const closehandle = (): void => setmodalopen(false);
  return (
    <Container>
      <Modal
        visible={modalopen}
        onClose={closehandle}
        component={
          <NewEntryComponent
            refreshentry={false}
          />
        }
      />
      <Button color="lightgray" onClick={() => setmodalopen(true)}>
        New entry
      </Button>
      <Button color="lightgray">Generate</Button>
    </Container>
  );
};

export default PassBar;
