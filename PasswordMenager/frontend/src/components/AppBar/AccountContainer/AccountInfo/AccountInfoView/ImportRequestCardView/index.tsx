import { Import } from "../../../../../../utils/import.utils";
import Button from "../../../../../Button";
import { Translation } from "../../../../../Translation";
import { ImportRequest, Imports } from "./component.styled";
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
  const activateImportRequest = (importRequestId: string) => {
    Import.getInstance().AcceptImportRequest(importRequestId).then(console.log);
  };

  return (
    <ImportRequest>
      <div>
        <span>{Translation('account.view.importRequest.table.column.importState')}</span>
        <span>{Translation('account.view.importRequest.table.column.createdAt')}</span>
        <span>{Translation('account.view.importRequest.table.column.numberOfEntriesToAdd')}</span>
        <span></span>
      </div>
      <Imports>
        {imports.map((importVal) => (
          <div key={importVal._id}>
            <span>{importVal.state}</span>
            <span>{importVal.created?.slice(0, 10)}</span>
            <span>{importVal.entriesToImport.length}</span>
            <Button onClick={() => activateImportRequest(importVal._id)}>
            {Translation('account.view.importRequest.table.actionButton')}
            </Button>
          </div>
        ))}
      </Imports>
    </ImportRequest>
  );
};
