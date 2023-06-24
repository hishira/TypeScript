import { ChangeEvent, useEffect, useState } from "react";
import { AcceptModalComponent } from "../../Modal/AcceptModal";
import { FileSelector } from "../../ImportFille";
import { ImportEntries } from "./component.styled";
import { Import } from "../../../utils/import.utils";

type ImportEntriesModalProps = {
  modalOpen: boolean;
  closeModalHandle: () => void;
};
type ImportEntriesModalComponentProps = {
  fileSetHandle: (file: File) => void;
};
const ImportEntriesModalComponent = ({
  fileSetHandle,
}: ImportEntriesModalComponentProps) => {
  const [file, setFile] = useState<File>();
  const [fileType, setFileType] = useState<string | undefined>(undefined);
  const possibleTypes: ("csv" | "txt" | "jpeg" | "png")[] = ["csv", "txt"]; //TODO: change
  const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target: { files = [] } = {} } = e;
    if (files && files?.length <= 0) return;
    files && setFile(files[0]);
    files && fileSetHandle(files[0]);
    const fileType = files && files[0].type;
    const selectedType = possibleTypes.find((ft) =>
      fileType?.toLowerCase().includes(ft)
    );
    setFileType(selectedType);
  };
  //TODO: Add proper message for txt file types
  return (
    <ImportEntries>
      <FileSelector availableFileType={possibleTypes} fileChange={fileChange} />
      {fileType ? (
        <div>
          {`Selected file type ${fileType}`}, fields must be in proper order,
          username, password,note.{" "}
        </div>
      ) : null}
    </ImportEntries>
  );
};
export const ImportModalEntries = ({
  modalOpen,
  closeModalHandle,
}: ImportEntriesModalProps) => {
  const [importModalOpen, setImportModalOpen] = useState<boolean>(modalOpen);
  const [formData, setFormData] = useState<FormData>();
  const closeHandle = () => {
    setImportModalOpen(false);
    closeModalHandle();
  };
  useEffect(() => {
    setImportModalOpen(modalOpen);
  }, [modalOpen]);

  const setFile = (file: File) => {
    const formFileData = new FormData();
    formFileData.set("file", file);
    setFormData(formFileData);
  };

  const acceptHandle = () => {
    if (!formData) return;

    Import.getInstance().Import(formData, 0);
  };
  return modalOpen ? (
    <AcceptModalComponent
      visible={importModalOpen}
      onClose={closeHandle}
      component={<ImportEntriesModalComponent fileSetHandle={setFile} />}
      acceptHandle={acceptHandle}
    ></AcceptModalComponent>
  ) : (
    <></>
  );
};
