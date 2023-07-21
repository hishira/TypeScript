import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { AcceptModalComponent } from "../../Modal/AcceptModal";
import { FileSelector } from "../../ImportFille";
import { ImportEntries } from "./component.styled";
import { Import } from "../../../utils/import.utils";
import ImportEntriesModalComponent from "./ImportEntriesModalComponent";

type ImportEntriesModalProps = {
  modalOpen: boolean;
  closeModalHandle: () => void;
};

const acceptHandle = (formData: FormData | undefined) => {
  if (!formData) return;

  Import.getInstance().Import(formData, 0);
};

const setFormDataAction = (
  file: File,
  setFormData: Dispatch<SetStateAction<FormData | undefined>>
) => {
  const formFileData = new FormData();
  formFileData.set("file", file);
  setFormData(formFileData);
};

export const ImportModalEntries = ({
  modalOpen,
  closeModalHandle,
}: ImportEntriesModalProps) => {
  const [importModalOpen, setImportModalOpen] = useState<boolean>(modalOpen);
  const [formData, setFormData] = useState<FormData>();
  const extend = {
    buttonText: "Check",
    handleButton: () => acceptHandle(formData),
  };
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
      component={
        <ImportEntriesModalComponent
          fileSetHandle={(e: File) => setFormDataAction(e, setFormData)}
        />
      }
      extend={extend}
      acceptHandle={() => acceptHandle(formData)}
    ></AcceptModalComponent>
  ) : (
    <></>
  );
};
