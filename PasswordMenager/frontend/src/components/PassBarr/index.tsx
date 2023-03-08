import React, { useState } from "react";
import { Export } from "../../api/export.api";
import Button from "../Button";
import Modal from "../Modal/";
import NewEntryComponent from "../NewEntryComponent/index";
import { Container } from "./component.styled";

const PassBar: React.FC = (): JSX.Element => {
  const [modalopen, setmodalopen] = useState<boolean>(false);
  const closehandle = (): void => setmodalopen(false);
  const exportHandle = (): void => {
    Export.getInstance()
      .ExportEntriesCsv()
      .then(() => {})
      .catch(console.log);
  };
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
      <Button color="lightgray" onClick={exportHandle}>
        Export entries
      </Button>
    </Container>
  );
};

export default PassBar;
