import { DeleteIcon } from "../../../../../../icons/DeleteIcon";
import { ShowIcon } from "../../../../../../icons/ShowIcon";
import { TuroOnIcon } from "../../../../../../icons/TurnOnIcon";
import { Actions } from "../component.styled";

type ImportRequestEntryProps = {
  importVal: ImportRequestData;
  acceptImportRequest: (importRequest: string) => void;
  showEntriesHandle: (importRequest: EntriesToImport[]) => void;
  deleteImportRequest: (importRequest: string) => void;
};
export const ImportRequestEntry = ({
  importVal,
  acceptImportRequest,
  showEntriesHandle,
  deleteImportRequest,
}: ImportRequestEntryProps) => (
  <div>
    <span>{importVal.state}</span>
    <span>{importVal.created}</span>
    <span>{importVal.entriesToImport.length}</span>
    <Actions>
      <TuroOnIcon click={() => acceptImportRequest(importVal._id)}></TuroOnIcon>
      <ShowIcon
        click={() => showEntriesHandle(importVal.entriesToImport)}
      ></ShowIcon>
      <DeleteIcon click={() => deleteImportRequest(importVal._id)}></DeleteIcon>
    </Actions>
  </div>
);
