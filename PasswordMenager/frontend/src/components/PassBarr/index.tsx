import React, { useState } from "react";
import { Export } from "../../utils/export.utils";
import Button from "../Button";
import { ImportDecrypted } from "../ImportModals/ImportDecrypted";
import Modal from "../Modal/";
import NewEntryComponent from "../NewEntryComponent/index";
import { Container, GroupContainer } from "./component.styled";
import { ImportModalEntries } from "../ImportModals/ImportEntries";
const PassBar: React.FC = (): JSX.Element => {
  const [modalopen, setmodalopen] = useState<boolean>(false);
  const [importModalOpen, setImportModalOpen] = useState<boolean>(false);
  const [importEntriesModalOpen, setImportEntriesModalOpen] =
    useState<boolean>(false);
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

  const importEntries = (): void => setImportEntriesModalOpen(true);

  return (
    <Container>
      <Modal
        visible={modalopen}
        onClose={closehandle}
        component={<NewEntryComponent refreshentry={false} />}
      />
      <ImportDecrypted
        modalOpen={importModalOpen}
        closeModalHandle={closeImportModalHandle}
      />
      <ImportModalEntries
        modalOpen={importEntriesModalOpen}
        closeModalHandle={() => setImportEntriesModalOpen(false)}
      />
      <GroupContainer>
        <Button color="lightgray" onClick={() => setmodalopen(true)}>
          New entry
        </Button>
        <Button color="lightgray" onClick={exportHandle}>
          Export entries
        </Button>
        <Button color="lightgray" onClick={exportEncrypted}>
          Export encrypted
        </Button>
        <Button color="lightgray" onClick={importEntries}>
          Import passwords
        </Button>
        <Button color="lightgray" onClick={importEncrypted}>
          Import encrypted
        </Button>
      </GroupContainer>
    </Container>
  );
};

export default PassBar;
