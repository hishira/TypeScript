import Modal from "../../../../../../Modal/";
import { AcceptModalComponent } from "../../../../../../Modal/AcceptModal";
import {
  ImportEntriesProprs,
  ImportRequestEntries,
} from "../ImportRequestEntries";
import { ActivateImportRequest, DeleteImportRequest } from "./component.styled";

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
      component={
        <DeleteImportRequest>
          Are you sure to delete import requests?
        </DeleteImportRequest>
      }
      acceptHandle={acceptDeleteImportRequestHandler}
    />
  ) : modalType === "activate" ? (
    <AcceptModalComponent
      visible={isModalVisible}
      onClose={() => modalClose()}
      component={
        <ActivateImportRequest>
          Activate import request? All entries will be added to your store
        </ActivateImportRequest>
      }
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
