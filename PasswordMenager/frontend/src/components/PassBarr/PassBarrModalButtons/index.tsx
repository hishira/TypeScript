import Button from "../../Button";
import { ModalButtonsContainer } from "./component.styled";

type ExportModalProps = {
  exportHandle: () => void;
  exportEncrypted: () => void;
};
export const ExpotrModal = ({ exportHandle, exportEncrypted }: ExportModalProps) => {
  return (
    <ModalButtonsContainer>
      <Button color="lightgray" onClick={exportHandle}>
        Export entries
      </Button>
      <Button color="lightgray" onClick={exportEncrypted}>
        Export encrypted
      </Button>
    </ModalButtonsContainer>
  );
};
type ImportModalProps = {
  importEntries: () => void;
  importEncrypted: () => void;
};
export const ImportModal = ({ importEntries, importEncrypted }: ImportModalProps) => {
  return (
    <ModalButtonsContainer>
      <Button color="lightgray" onClick={importEntries}>
        Import passwords
      </Button>
      <Button color="lightgray" onClick={importEncrypted}>
        Import encrypted
      </Button>
    </ModalButtonsContainer>
  );
};
