import { useState } from "react";
import { Import } from "../../../../../../utils/import.utils";
import Modal from "../../../../../Modal";
import { Translation } from "../../../../../Translation";
import { DeleteIcon } from "../../../../../icons/DeleteIcon";
import { ShowIcon } from "../../../../../icons/ShowIcon";
import { TuroOnIcon } from "../../../../../icons/TurnOnIcon";
import { ImportRequestEntries } from "./ImportRequestEntries";
import { Actions, ImportRequest, Imports } from "./component.styled";

export const ImportRequestCardView = ({
  imports,
}: {
  imports: ImportRequestData[];
}) => {
  const [showEntries, setShowEntries] = useState(false);
  const [entriesToShow, setEntriesToShow] = useState<EntriesToImport[]>([]);
  const activateImportRequest = (importRequestId: string) => {
    Import.getInstance().AcceptImportRequest(importRequestId).then(console.log);
  };
  const showEntriesHandle = (entries: EntriesToImport[]) => {
    setEntriesToShow(entries);
    setShowEntries(true);
  };
  return (
    <>
      <Modal
        visible={showEntries}
        onClose={() => setShowEntries(false)}
        component={<ImportRequestEntries entries={entriesToShow} />}
      ></Modal>
      <ImportRequest>
        <div>
          <span>
            {Translation("account.view.importRequest.table.column.importState")}
          </span>
          <span>
            {Translation("account.view.importRequest.table.column.createdAt")}
          </span>
          <span>
            {Translation(
              "account.view.importRequest.table.column.numberOfEntriesToAdd"
            )}
          </span>
          <span>Actions</span>
        </div>
        <Imports>
          {imports.map((importVal) => (
            <div key={importVal._id}>
              <span>{importVal.state}</span>
              <span>{importVal.created}</span>
              <span>{importVal.entriesToImport.length}</span>
              <Actions>
                <TuroOnIcon
                  click={() => activateImportRequest(importVal._id)}
                ></TuroOnIcon>
                <ShowIcon
                  click={() => showEntriesHandle(importVal.entriesToImport)}
                ></ShowIcon>
                <DeleteIcon></DeleteIcon>
              </Actions>
            </div>
          ))}
        </Imports>
      </ImportRequest>
    </>
  );
};
