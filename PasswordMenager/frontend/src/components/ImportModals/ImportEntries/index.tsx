import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IGeneral } from "../../../models/General";
import { Import } from "../../../utils/import.utils";
import { InfoPopUpObject } from "../../../utils/popup.utils";
import { AcceptModalComponent } from "../../Modal/AcceptModal";
import { TranslationFunction } from "../../Translation";
import ImportEntriesModalComponent from "./ImportEntriesModalComponent";
import { inject, observer } from "mobx-react";

type ImportEntriesModalProps = {
  modalOpen: boolean;
  closeModalHandle: () => void;
  store?: IGeneral;
};
export type ImportCheckData = {
  entiresToImport: any[];
  importRequestId: string;
  numberOfEntriesToAdd: number;
};
const acceptHandle = (
  formData: FormData | undefined,
  setImportInfo: Dispatch<SetStateAction<ImportCheckData | null>>,
  store?: IGeneral
): Promise<boolean> => {
  if (!formData) {
    store?.setPopUpinfo(InfoPopUpObject("Please select file"));

    return Promise.resolve(false);
  }
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

const ImportModalEntries = ({
  modalOpen,
  closeModalHandle,
  store,
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
        acceptHandle(formData, setImportFileInfo, store).then(
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
      acceptHandle={() => acceptHandle(formData, setImportFileInfo, store)}
    ></AcceptModalComponent>
  ) : (
    <></>
  );
};

export default inject("store")(observer(ImportModalEntries));
