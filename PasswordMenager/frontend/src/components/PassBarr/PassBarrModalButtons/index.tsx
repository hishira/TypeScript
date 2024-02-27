import Button from "../../Button";
import { Translation } from "../../Translation";
import { TitleContainer } from "../../shared/styled-components";
import { ExportButtons, ModalButtonsContainer } from "./component.styled";

type ExportModalProps = {
  exportCsvHandle: () => void;
  exportJsonHandle: () => void;
  exportEncrypted: () => void;
};
export const ExpotrModal = ({
  exportCsvHandle,
  exportJsonHandle,
  exportEncrypted,
}: ExportModalProps) => {
  return (
    <ModalButtonsContainer>
      <TitleContainer>Export entries options</TitleContainer>
      <ExportButtons>
        <Button color="lightgray" onClick={exportCsvHandle}>
          {Translation("bar.modal.button.exportentriescsv")}
        </Button>
        <Button color="lightgray" onClick={exportJsonHandle}>
          {Translation("bar.modal.button.exportentriesjson")}
        </Button>
        <Button color="lightgray" onClick={exportEncrypted}>
          {Translation("bar.modal.button.exportencrypted")}
        </Button>
      </ExportButtons>
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
