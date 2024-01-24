import Modal from "../../../../../../Modal/";
import { AcceptModalComponent } from "../../../../../../Modal/AcceptModal";
import {
  ImportEntriesProprs,
  ImportRequestEntries,
} from "../ImportRequestEntries";
import {
  ActivateImportRequest,
  ActivateImportRequestContextModal,
  DeleteImportRequest,
  DeleteModalContent,
  TitleContainer,
} from "./component.styled";

export type ModalViewsType = {
  modalType: "show" | "delete" | "activate";
  isModalVisible: boolean;
  showEntryModal: ImportEntriesProprs;
  modalClose: () => void;
  acceptDeleteImportRequestHandler: () => void;
  acceptActivateImportRequest: () => void;
};

const DeleteModalComponenet = () => (
  <DeleteImportRequest>
    <TitleContainer>Delete import request</TitleContainer>
    <DeleteModalContent>
      Are you sure to delete import requests?
    </DeleteModalContent>
  </DeleteImportRequest>
);

const ActiveModalComponent = () => (
  <ActivateImportRequest>
    <TitleContainer>Activate import request</TitleContainer>
    <ActivateImportRequestContextModal>
      Do you want to activate import request? All entries will be added to your
      store
    </ActivateImportRequestContextModal>
  </ActivateImportRequest>
);
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
      component={<DeleteModalComponenet />}
      acceptHandle={acceptDeleteImportRequestHandler}
    />
  ) : modalType === "activate" ? (
    <AcceptModalComponent
      visible={isModalVisible}
      onClose={() => modalClose()}
      component={<ActiveModalComponent />}
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
