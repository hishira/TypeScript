import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Import } from "../../../utils/import.utils";
import { AcceptModalComponent } from "../../Modal/AcceptModal";
import { TranslationFunction } from "../../Translation";
import ImportEntriesModalComponent from "./ImportEntriesModalComponent";

type ImportEntriesModalProps = {
  modalOpen: boolean;
  closeModalHandle: () => void;
};
export type ImportCheckData = {
  entiresToImport: any[];
  importRequestId: string;
  numberOfEntriesToAdd: number;
};
const acceptHandle = (
  formData: FormData | undefined,
  setImportInfo: Dispatch<SetStateAction<ImportCheckData | null>>
): Promise<boolean> => {
  if (!formData) return Promise.resolve(false);
  const fileType = (formData.get("file") as File).type;
  const type: "csv" | "json" | null = ["text/csv", "csv"].includes(fileType)
    ? "csv"
    : ["application/json", "json"].includes(fileType)
    ? "json"
    : null;
  if (type === null) return Promise.resolve(false);
  return Import.getInstance()
    .Import(formData, 0, type)
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
  buttonText: TranslationFunction("import.modal.button.check"),
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

  const functionTimeout = () => {
    setExtendData({
      buttonText: "Import",
      handleButton: () => console.log("Import"),
    });
  };
  useEffect(() => {
    setImportModalOpen(modalOpen);
    setExtendData({
      ...extendData,
      handleButton: () =>
        acceptHandle(formData, setImportFileInfo).then(
          (_) => _ && setTimeout(() => functionTimeout())
        ),
    });
  }, [modalOpen, formData]);

  const functionFile = (e: File) => {
    setFormDataAction(e, setFormData);
  };
  return modalOpen ? (
    <AcceptModalComponent
      visible={importModalOpen}
      onClose={closeHandle}
      component={
        <ImportEntriesModalComponent
          fileSetHandle={functionFile}
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
