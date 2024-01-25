import Modal from "../../../../../../Modal/";
import { AcceptModalComponent } from "../../../../../../Modal/AcceptModal";
import { Translation } from "../../../../../../Translation";
import { TitleContainer } from "../../../../../../shared/styled-components";
import {
  ImportEntriesProprs,
  ImportRequestEntries,
} from "../ImportRequestEntries";
import {
  ActivateImportRequest,
  ActivateImportRequestContextModal,
  DeleteImportRequest,
  DeleteModalContent,
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
    <TitleContainer>{Translation("deleteImportRequest.title")}</TitleContainer>
    <DeleteModalContent>
      {Translation("deleteImportRequest.content")}
    </DeleteModalContent>
  </DeleteImportRequest>
);

const ActiveModalComponent = () => (
  <ActivateImportRequest>
    <TitleContainer>
      {Translation("activateImportRequest.title")}
    </TitleContainer>
    <ActivateImportRequestContextModal>
      {Translation("deleteImportRequest.content")}
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
  if (modalType === "delete") {
    return (
      <AcceptModalComponent
        visible={isModalVisible}
        onClose={() => modalClose()}
        component={<DeleteModalComponenet />}
        acceptHandle={acceptDeleteImportRequestHandler}
      />
    );
  }
  if (modalType === "activate") {
    return (
      <AcceptModalComponent
        visible={isModalVisible}
        onClose={() => modalClose()}
        component={<ActiveModalComponent />}
        acceptHandle={acceptActivateImportRequest}
      />
    );
  }

  return (
    <Modal
      visible={isModalVisible}
      onClose={modalClose}
      component={<ImportRequestEntries {...showEntryModal} />}
    ></Modal>
  );
};
