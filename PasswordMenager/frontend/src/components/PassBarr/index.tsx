import React, { useState } from "react";
import { Export } from "../../utils/export.utils";
import Button from "../Button";
import { ImportFile } from "../ImportFille";
import Modal from "../Modal/";
import NewEntryComponent from "../NewEntryComponent/index";
import { Container } from "./component.styled";
import { AcceptModalComponent } from "../Modal/AcceptModal";
import { ImportDecrypted } from "../ImportModals/ImportDecrypted";
const PassBar: React.FC = (): JSX.Element => {
  const [modalopen, setmodalopen] = useState<boolean>(false);
  const [importModalOpen, setImportModalOpen] = useState<boolean>(false);
  const closehandle = (): void => setmodalopen(false);
  const closeImportModalHandle = (): void => setImportModalOpen(false);
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

  const importEncrypted = (): void => setImportModalOpen(true);

  return (
    <Container>
      <Modal
        visible={modalopen}
        onClose={closehandle}
        component={<NewEntryComponent refreshentry={false} />}
      />
      <ImportDecrypted modalOpen={importModalOpen} closeModalHandle={closeImportModalHandle} />
      <Button color="lightgray" onClick={() => setmodalopen(true)}>
        New entry
      </Button>
      <Button color="lightgray" onClick={exportHandle}>
        Export entries
      </Button>
      <Button color="lightgray" onClick={exportEncrypted}>
        Export encrypted
      </Button>
      <Button color="lightgray" onClick={importEncrypted}>
        Import encrypted
      </Button>
    </Container>
  );
};

export default PassBar;
