import { Import } from "../../../../../../utils/import.utils";
import Button from "../../../../../Button";
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
        <span>Import state</span>
        <span>Created at</span>
        <span>Number of entries to add</span>
        <span></span>
      </div>
      <Imports>
        {imports.map((importVal) => (
          <div key={importVal._id}>
            <span>{importVal.state}</span>
            <span>{importVal.created?.slice(0, 10)}</span>
            <span>{importVal.entriesToImport.length}</span>
            <Button onClick={() => activateImportRequest(importVal._id)}>
              Activate
            </Button>
          </div>
        ))}
      </Imports>
    </ImportRequest>
  );
};
