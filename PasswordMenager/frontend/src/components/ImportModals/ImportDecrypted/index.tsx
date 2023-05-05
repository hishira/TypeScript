import { useState } from "react";
import { AcceptModalComponent } from "../../Modal/AcceptModal";
import { ImportFile } from "../../ImportFille";

export const ImportDecrypted = (): JSX.Element => {
  const [importModalOpen, setImportModalOpen] = useState<boolean>(false);
  const closeImportModalHandle = (): void => setImportModalOpen(false);

  return (
    <AcceptModalComponent
      visible={importModalOpen}
      onClose={closeImportModalHandle}
      component={<ImportFile />}
      acceptHandle={() => {}}
    />
  );
};
