import { useState } from "react";
import { ImportModalOpenHandle } from "../../../hooks/importDecrypted.hook";
import { Import } from "../../../utils/import.utils";
import { ImportFile } from "../../ImportFille";
import { AcceptModalComponent } from "../../Modal/AcceptModal";
import { inject, observer } from "mobx-react";
import { IGeneral } from "../../../models/General";
import { InfoPopUpObject } from "../../../utils/popup.utils";
type ImportDecryptedProps = {
  modalOpen: boolean;
  closeModalHandle: () => void;
  store?: IGeneral
};
const ImportDecrypted = ({
  modalOpen,
  closeModalHandle,
  store
}: ImportDecryptedProps): JSX.Element => {
  const [importModalOpen, setImportModalOpen] = useState<boolean>(modalOpen);
  const [formData, setFormData] = useState<FormData>();
  const [uuid, setuuid] = useState<string>("");
  const closeImportModalHandle = (): void => {
    setImportModalOpen(false);
    closeModalHandle();
    fileChange();
  };
  const fileChange = (...args: File[]): void => {
    if (args.length <= 0) return;
    const file = args[0];
    if (file) {
      const formData = new FormData();
      formData.set("file", file);
      formData.set("password", "example_password_to_decrypt_data");
      setFormData(formData);
    }
  };

  const acceptHandleFunction = () => {
    if (!formData) {
      store?.setPopUpinfo(InfoPopUpObject('Please select file'))
      return;
    }
    Import.getInstance().ImportFile(formData, 0).catch(console.error);
  };

  ImportModalOpenHandle(setImportModalOpen, setuuid, modalOpen);

  return modalOpen ? (
    <AcceptModalComponent
      visible={importModalOpen}
      onClose={closeImportModalHandle}
      component={<ImportFile fileChangeHandle={fileChange} key={uuid} />}
      acceptHandle={acceptHandleFunction}
    />
  ) : (
    <></>
  );
};

export default inject("store")(observer(ImportDecrypted));
