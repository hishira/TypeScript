import { useEffect, useState } from "react";
import { AcceptModalComponent } from "../../Modal/AcceptModal";

type ImportEntriesModalProps = {
  modalOpen: boolean;
  closeModalHandle: () => void;
};

export const ImportModalEntries = ({
  modalOpen,
  closeModalHandle,
}: ImportEntriesModalProps) => {
  const [importModalOpen, setImportModalOpen] = useState<boolean>(modalOpen);
  const closeHandle = () => {
    setImportModalOpen(false);
    closeModalHandle();
  };
  useEffect(() => {
    setImportModalOpen(modalOpen);
  }, [modalOpen]);
  return modalOpen ? (
    <AcceptModalComponent
      visible={importModalOpen}
      onClose={closeHandle}
      component={<div>test</div>}
      acceptHandle={() => {}}
    ></AcceptModalComponent>
  ) : (
    <></>
  );
};
