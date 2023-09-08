import Button from "../../Button";
import { Translation } from "../../Translation";
import { ModalButtonsContainer } from "./component.styled";

type ExportModalProps = {
  exportHandle: () => void;
  exportEncrypted: () => void;
};
export const ExpotrModal = ({
  exportHandle,
  exportEncrypted,
}: ExportModalProps) => {
  return (
    <ModalButtonsContainer>
      <Button color="lightgray" onClick={exportHandle}>
        {Translation("bar.modal.button.exportentries")}
      </Button>
      <Button color="lightgray" onClick={exportEncrypted}>
        {Translation("bar.modal.button.exportencrypted")}
      </Button>
    </ModalButtonsContainer>
  );
};
type ImportModalProps = {
  importEntries: () => void;
  importEncrypted: () => void;
};
export const ImportModal = ({
  importEntries,
  importEncrypted,
}: ImportModalProps) => {
  return (
    <ModalButtonsContainer>
      <Button color="lightgray" onClick={importEntries}>
        {Translation("bar.modal.button.importpaswords")}
      </Button>
      <Button color="lightgray" onClick={importEncrypted}>
        {Translation("bar.modal.button.importencrypted")}
      </Button>
    </ModalButtonsContainer>
  );
};
