import { Dispatch, SetStateAction, useState } from "react";
import { IGeneral } from "../../../../../../models/General";
import { Import } from "../../../../../../utils/import.utils";
import { ModalOpenUtils } from "../../../../../../utils/moda.open.utils";
import {
  ErrorPopUpObject,
  SuccessPopUpObject,
} from "../../../../../../utils/popup.utils";

export const ImportRequestUtilsHook = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [entriesToShow, setEntriesToShow] = useState<EntriesToImport[]>([]);
  const [modalType, setModalType] = useState<"show" | "delete" | "activate">(
    "show"
  );
  const [actionImportRequest, setActionImportRequest] = useState<
    string | undefined
  >(undefined);
  const showEntriesHandle = (entries: EntriesToImport[]) => {
    setEntriesToShow(entries);
    setModalType("show");
    setModalOpen(true);
    ModalOpenUtils.getInstance().CloseModal = true;
  };

  const deleteImportRequest = (importRequestId: string) => {
    setModalType("delete");
    setActionImportRequest(importRequestId);
    setModalOpen(true);
  };

  const acceptImportRequest = (importRequestId: string) => {
    setModalType("activate");
    setModalOpen(true);
    ModalOpenUtils.getInstance().CloseModal = true;
  };

  const showImportModalClose = () => {
    setModalOpen(false);
    setActionImportRequest(undefined);
    ModalOpenUtils.getInstance().CloseModal = false;
  };

  const deleteImportRequestHandle = (
    refetch: Dispatch<SetStateAction<boolean>>,
    store?: IGeneral
  ) => {
    if (actionImportRequest === undefined) return;
    Import.getInstance()
      .DeleteImportRequest(actionImportRequest)
      .then((r) => {
        handleDeleteImportRequest(r,refetch,store);
        showImportModalClose();
      });
  };

  return {
    showEntriesHandle,
    deleteImportRequest,
    acceptImportRequest,
    showImportModalClose,
    actionImportRequest,
    modalOpen,
    modalType,
    entriesToShow,
    deleteImportRequestHandle,
  };
};

const handleDeleteImportRequest = (request: {status: number}, refetch: Dispatch<SetStateAction<boolean>>, store?: IGeneral) => {
    if (request.status >= 200 && request.status <= 299) {
        store?.setPopUpinfo(
          SuccessPopUpObject("Import request successfull deleted")
        );
        refetch((a) => !a);
      } else {
        store?.setPopUpinfo(
          ErrorPopUpObject("Error occurs while deleting import request")
        );
      }
}