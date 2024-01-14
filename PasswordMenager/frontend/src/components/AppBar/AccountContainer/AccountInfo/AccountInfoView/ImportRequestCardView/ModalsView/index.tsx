import Modal from "../../../../../../Modal/";
import { AcceptModalComponent } from "../../../../../../Modal/AcceptModal";
import {
  ImportEntriesProprs,
  ImportRequestEntries,
} from "../ImportRequestEntries";

export type ModalViewsType = {
  modalType: "show" | "delete" | "activate";
  isModalVisible: boolean;
  showEntryModal: ImportEntriesProprs;
  modalClose: () => void;
  acceptDeleteImportRequestHandler: () => void;
  acceptActivateImportRequest: () => void;
};

export const ModalsView = ({
  modalType,
  showEntryModal,
  isModalVisible,
  modalClose,
  acceptDeleteImportRequestHandler,
  acceptActivateImportRequest,
}: ModalViewsType) => {
  return modalType === "delete" ? (
    <AcceptModalComponent
      visible={isModalVisible}
      onClose={() => modalClose()}
      component={<div>Are you sure to delete import requests?</div>}
      acceptHandle={acceptDeleteImportRequestHandler}
    />
  ) : modalType === "activate" ? (
    <AcceptModalComponent
      visible={isModalVisible}
      onClose={() => modalClose()}
      component={<div>Activate this import request?</div>}
      acceptHandle={acceptActivateImportRequest}
    />
  ) : (
    <Modal
      visible={isModalVisible}
      onClose={modalClose}
      component={<ImportRequestEntries {...showEntryModal} />}
    ></Modal>
  );
};
