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
export type ImportCheckData = {
  entiresToImport: [];
  importRequestId: string;
  numberOfEntriesToAdd: number;
};
const acceptHandle = (
  formData: FormData | undefined,
  setImportInfo: Dispatch<SetStateAction<ImportCheckData | null>>
): Promise<boolean> => {
  console.log(formData);
  if (!formData) return Promise.resolve(false);

  return Import.getInstance()
    .Import(formData, 0)
    .then((data: ImportCheckData) => {
      console.log(data);
      setImportInfo(data);
    })
    .then((_) => true);
};

const setFormDataAction = (
  file: File,
  setFormData: Dispatch<SetStateAction<FormData | undefined>>
) => {
  const formFileData = new FormData();
  formFileData.set("file", file);
  setFormData(formFileData);
};

const CheckExtendButton = (
  formData: FormData | undefined,
  setImportFileInfo: Dispatch<SetStateAction<ImportCheckData | null>>
) => ({
  buttonText: "Check",
  handleButton: () => acceptHandle(formData, setImportFileInfo),
});

export const ImportModalEntries = ({
  modalOpen,
  closeModalHandle,
}: ImportEntriesModalProps) => {
  const [importModalOpen, setImportModalOpen] = useState<boolean>(modalOpen);
  const [formData, setFormData] = useState<FormData>();

  const [importFileInfo, setImportFileInfo] = useState<ImportCheckData | null>(
    null
  );

  const [extendData, setExtendData] = useState<{
    buttonText: string;
    handleButton: (...args: any[]) => any;
  }>(CheckExtendButton(formData, setImportFileInfo));

  const closeHandle = () => {
    setImportModalOpen(false);
    closeModalHandle();
  };

  useEffect(() => {
    setImportModalOpen(modalOpen);
    setExtendData({
      ...extendData,
      handleButton: () =>
        acceptHandle(formData, setImportFileInfo).then(
          (_) =>
            _ &&
            setExtendData({
              buttonText: "Import",
              handleButton: () => console.log("Import"),
            })
        ),
    });
  }, [modalOpen, formData]);

  return modalOpen ? (
    <AcceptModalComponent
      visible={importModalOpen}
      onClose={closeHandle}
      component={
        <ImportEntriesModalComponent
          fileSetHandle={(e: File) => setFormDataAction(e, setFormData)}
          importFileInfo={importFileInfo}
        />
      }
      extend={extendData}
      acceptHandle={() => acceptHandle(formData, setImportFileInfo)}
    ></AcceptModalComponent>
  ) : (
    <></>
  );
};
