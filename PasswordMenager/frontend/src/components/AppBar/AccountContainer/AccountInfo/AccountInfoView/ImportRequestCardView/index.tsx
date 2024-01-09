import { useState } from "react";
import { Import } from "../../../../../../utils/import.utils";
import Button from "../../../../../Button";
import { Translation } from "../../../../../Translation";
import { DeleteIcon } from "../../../../../icons/DeleteIcon";
import { ShowIcon } from "../../../../../icons/ShowIcon";
import { TuroOnIcon } from "../../../../../icons/TurnOnIcon";
import { Actions, ImportRequest, Imports } from "./component.styled";
import Modal from "../../../../../Modal";
export type ImportRequestData = {
  _id: string;
  created: string;
  state: string;
  userid: string;
  entriesToImport: {
    email: string;
    password: string;
    title: string;
    url: string;
    username: string;
  }[];
};
export const ImportRequestCardView = ({
  imports,
}: {
  imports: ImportRequestData[];
}) => {
  const [showEntries, setShowEntries] = useState(false);
  const activateImportRequest = (importRequestId: string) => {
    Import.getInstance().AcceptImportRequest(importRequestId).then(console.log);
  };

  return (
    <ImportRequest>
      <Modal
        visible={showEntries}
        onClose={() => setShowEntries(false)}
        component={<div>Test</div>}
      ></Modal>
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
            <span>{importVal.created?.slice(0, 10)}</span>
            <span>{importVal.entriesToImport.length}</span>
            <Actions>
              {/* <Button onClick={() => activateImportRequest(importVal._id)}>
                {Translation("account.view.importRequest.table.actionButton")}
              </Button> */}
              <TuroOnIcon
                click={() => activateImportRequest(importVal._id)}
              ></TuroOnIcon>
              <ShowIcon click={() => setShowEntries(true)}></ShowIcon>
              <DeleteIcon></DeleteIcon>
            </Actions>
          </div>
        ))}
      </Imports>
    </ImportRequest>
  );
};
