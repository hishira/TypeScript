import { AcceptModalComponent } from "../../../../../../Modal/AcceptModal";
import Modal from "../../../../../../Modal/";
import {
  ImportEntriesProprs,
  ImportRequestEntries,
} from "../ImportRequestEntries";
import { useEffect, useState } from "react";

export type ModalViewsType = {
  modalType: "show" | "delete" | "activate";
  isModalVisible: boolean;
  showEntryModal: ImportEntriesProprs;
  modalClose: () => void;
  acceptModalHandler: () => void;
};

export const ModalsView = ({
  modalType,
  showEntryModal,
  isModalVisible,
  modalClose,
  acceptModalHandler,
}: ModalViewsType) => {
  const [mt, setMt] = useState<"show" | "delete" | "activate">("show");
 
  return modalType === "delete" ? (
    <AcceptModalComponent
      visible={isModalVisible}
      onClose={() => modalClose()}
      component={<div>Are you sure to delete import requests</div>}
      acceptHandle={acceptModalHandler}
    />
  ) : (
    <Modal
      visible={isModalVisible}
      onClose={modalClose}
      component={<ImportRequestEntries {...showEntryModal} />}
    ></Modal>
  );
};
