import React, { useState } from "react";
import { Export } from "../../utils/export.utils";
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

  const exportEncrypted = (): void => {
    Export.getInstance()
      .ExportEncrypted()
      .then(() => {})
      .catch(console.error);
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
      <Button color="lightgray" onClick={exportEncrypted}>
        Export encrypted
      </Button>
    </Container>
  );
};

export default PassBar;
