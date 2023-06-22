import { ChangeEvent, useEffect, useState } from "react";
import { AcceptModalComponent } from "../../Modal/AcceptModal";
import { FileSelector } from "../../ImportFille";
import { ImportEntries } from "./component.styled";

type ImportEntriesModalProps = {
  modalOpen: boolean;
  closeModalHandle: () => void;
};

const ImportEntriesModalComponent = () => {
  const [file, setFile] = useState<File>();
  const [fileType, setFileType] = useState<string | undefined>(undefined);
  const possibleTypes: ("csv" | "txt" | "jpeg" | "png")[] = ["csv", "txt"]; //TODO: change
  const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target: { files = [] } = {} } = e;
    if (files && files?.length <= 0) return;
    files && setFile(files[0]);
    const fileType = files && files[0].type;
    const selectedType = possibleTypes.find((ft) =>
      fileType?.toLowerCase().includes(ft)
    );
    setFileType(selectedType);
  };
  //TODO: Add proper message for txt file types
  return (
    <ImportEntries>
      <FileSelector
        availableFileType={possibleTypes}
        fileChange={fileChange}
      />
      {fileType ? <div>{`Selected file type ${fileType}`}, fields must be in proper order, username, password,note. </div> : null}
    </ImportEntries>
  );
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
      component={<ImportEntriesModalComponent />}
      acceptHandle={() => {}}
    ></AcceptModalComponent>
  ) : (
    <></>
  );
};
