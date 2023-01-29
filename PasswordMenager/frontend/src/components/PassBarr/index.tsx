import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import Modal from "../Modal/";
import NewEntryComponent from "../NewEntryComponent/index";
const Container = styled.div`
  display: flex;
  padding: 5px;
  justify-content: center;
  & > *:not(:first-child) {
    margin-left: 15px;
  }
`;



const PassBar: React.FC = (): JSX.Element => {
  const [modalopen, setmodalopen] = useState<boolean>(false);
  const closehandle = (): void => setmodalopen(false);
  return (
    <Container>
      <Modal
        visible={modalopen}
        onClose={closehandle}
        component={<NewEntryComponent refreshentry={false} />}
      />
      <Button color="lightgray" onClick={() => setmodalopen(true)}>
        New entry
      </Button>
    </Container>
  );
};

export default PassBar;
