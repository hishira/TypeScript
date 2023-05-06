import { useEffect, useState } from "react";
import { AcceptModalComponent } from "../../Modal/AcceptModal";
import { ImportFile } from "../../ImportFille";
type ImportDecryptedProps = {
  modalOpen: boolean;
  closeModalHandle: () => void;
};
export const ImportDecrypted = ({
  modalOpen,
  closeModalHandle,
}: ImportDecryptedProps): JSX.Element => {
  const [importModalOpen, setImportModalOpen] = useState<boolean>(modalOpen);
  const closeImportModalHandle = (): void => {
    setImportModalOpen(false);
    closeModalHandle();
  };
  const fileChange = (...args: File[]): void => {
    console.log(args);
  };

  useEffect(() => {
    setImportModalOpen(modalOpen);
  }, [modalOpen]);
  return (
    <AcceptModalComponent
      visible={importModalOpen}
      onClose={closeImportModalHandle}
      component={<ImportFile fileChangeHandle={fileChange} />}
      acceptHandle={() => {}}
    />
  );
};
