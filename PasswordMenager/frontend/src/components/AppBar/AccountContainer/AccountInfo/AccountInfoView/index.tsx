import { Import } from "../../../../../utils/import.utils";
import Button from "../../../../Button";
import {
  ImportRequest,
  Imports,
  Last,
  Notification,
} from "../component.styled";

export type ContentType = "Notification" | "ImportRequest" | "Last";
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
export const NotificationElement = ({
  notification,
}: {
  notification: any[];
}) => {
  // TODO: Add notification which expire password
  return (
    <Notification>
      Number of active notification {notification.length}
    </Notification>
  );
};

const ImportRequestElement = ({
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

const LastElement = () => <Last>Last</Last>;
export const GetCurrentView = (
  mainContentView: ContentType,
  imports: any,
  notification: any
): JSX.Element => {
  return mainContentView === "Notification" ? (
    <NotificationElement notification={notification} />
  ) : mainContentView === "ImportRequest" ? (
    <ImportRequestElement imports={imports}></ImportRequestElement>
  ) : (
    <LastElement></LastElement>
  );
};
