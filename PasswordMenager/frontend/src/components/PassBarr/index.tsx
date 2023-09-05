import React, { useState } from "react";
import { Export } from "../../utils/export.utils";
import Button from "../Button";
import { ImportDecrypted } from "../ImportModals/ImportDecrypted";
import { ImportModalEntries } from "../ImportModals/ImportEntries";
import Modal from "../Modal/";
import NewEntryComponent from "../NewEntryComponent/index";
import { ExpotrModal, ImportModal } from "./PassBarrModalButtons";
import { Container, GroupContainer } from "./component.styled";
import { ExportIcon } from "../icons/ExportIcon";
import { ImportIcon } from "../icons/ImportIcon";
import { PlusComponent } from "../icons/PlusIcon";
import IconButton from "../IconButton";

const exportHandle = (): void => {
  Export.getInstance()
    .ExportEntriesCsv()
    .then(() => {})
    .catch(console.error);
};

const exportEncrypted = (): void => {
  Export.getInstance()
    .ExportEncrypted()
    .then(() => {})
    .catch(console.error);
};
const PassBar: React.FC = (): JSX.Element => {
  const [modalopen, setmodalopen] = useState<boolean>(false);
  const [importModalOpen, setImportModalOpen] = useState<boolean>(false);
  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);
  const [importOptionModalOpen, setImportOptionModalOpen] =
    useState<boolean>(false);
  const [importEntriesModalOpen, setImportEntriesModalOpen] =
    useState<boolean>(false);
  const closehandle = (): void => setmodalopen(false);
  const closeImportModalHandle = (): void => setImportModalOpen(false);

  const importEncrypted = (): void => setImportModalOpen(true);

  const importEntries = (): void => setImportEntriesModalOpen(true);

  return (
    <Container>
      <Modal
        visible={modalopen}
        onClose={closehandle}
        component={<NewEntryComponent refreshentry={false} />}
      />
      <Modal
        visible={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        component={
          <ExpotrModal
            exportEncrypted={exportEncrypted}
            exportHandle={exportHandle}
          />
        }
      />
      <Modal
        visible={importOptionModalOpen}
        onClose={() => setImportOptionModalOpen(false)}
        component={
          <ImportModal
            importEncrypted={importEncrypted}
            importEntries={importEntries}
          />
        }
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
        {/*<Button color="lightgray" onClick={() => setmodalopen(true)}>
          New entry
        </Button>*/}
        <IconButton>
          <PlusComponent />
        </IconButton>
        {/*<Button color="lightgray" onClick={() => setExportModalOpen(true)}>
          Export
        </Button>*/}
        <ExportIcon />
        {/*<Button
          color="lightgray"
          onClick={() => setImportOptionModalOpen(true)}
        >
          Import
        </Button>*/}
        <ImportIcon />
      </GroupContainer>
    </Container>
  );
};

export default PassBar;
