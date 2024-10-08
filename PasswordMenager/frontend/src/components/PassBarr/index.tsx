import { inject, observer } from "mobx-react";
import { useState } from "react";
import { IGeneral } from "../../models/General";
import { Export } from "../../utils/export.utils";
import IconButton from "../IconButton";
import ImportDecrypted from "../ImportModals/ImportDecrypted";
import ImportModalEntries from "../ImportModals/ImportEntries";
import Modal from "../Modal/";
import NewEntryComponent from "../NewEntryComponent/index";
import { ExportIcon } from "../icons/ExportIcon";
import { ImportIcon } from "../icons/ImportIcon";
import { PlusComponent } from "../icons/PlusIcon";
import { ExpotrModal, ImportModal } from "./PassBarrModalButtons";
import { Container, GroupContainer } from "./component.styled";

const exportCsvHandle = (): void => {
  Export.getInstance()
    .ExportEntriesCsv()
    .then(() => {})
    .catch(console.error);
};

const exportJsonHandler = (): void => {
  Export.getInstance()
    .ExportJson()
    .then(() => {})
    .catch(console.error);
};

const exportEncrypted = (): void => {
  Export.getInstance()
    .ExportEncrypted()
    .then(() => {})
    .catch(console.error);
};
const PassBar = ({ store }: { store?: IGeneral }): JSX.Element => {
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
  const refreshEntryAfterCreate = () => {
    store?.setRefetchAfterEntryCreate(!store?.RefetchAfterEntryCreate);
  };
  return (
    <Container>
      <Modal
        visible={modalopen}
        onClose={closehandle}
        component={
          <NewEntryComponent
            refreshentry={false}
            refresh={refreshEntryAfterCreate}
            closeModalDispatcherHandle={setmodalopen}
          />
        }
      />
      <Modal
        visible={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        component={
          <ExpotrModal
            exportEncrypted={exportEncrypted}
            exportCsvHandle={exportCsvHandle}
            exportJsonHandle={exportJsonHandler}
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
        <IconButton>
          <PlusComponent click={() => setmodalopen(true)} />
        </IconButton>
        {!store?.IsLocal && (
          <>
            <ExportIcon click={() => setExportModalOpen(true)} />
            <ImportIcon click={() => setImportOptionModalOpen(true)} />
          </>
        )}
      </GroupContainer>
    </Container>
  );
};

export default inject("store")(observer(PassBar));
