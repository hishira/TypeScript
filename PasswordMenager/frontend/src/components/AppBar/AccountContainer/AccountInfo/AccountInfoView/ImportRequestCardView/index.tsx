import { inject, observer } from "mobx-react";
import { Dispatch, SetStateAction } from "react";
import { IGeneral } from "../../../../../../models/General";
import { Translation } from "../../../../../Translation";
import { ImportRequestEntry } from "./ImportRequest";
import { ModalsView } from "./ModalsView";
import { ImportRequest, Imports } from "./component.styled";
import { ImportRequestUtilsHook } from "./importRequest.hook";

const ImportRequestCardView = ({
  imports,
  store,
  refetch,
}: {
  imports: ImportRequestData[];
  store?: IGeneral;
  refetch: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    showEntriesHandle,
    deleteImportRequest,
    acceptImportRequest,
    showImportModalClose,
    modalOpen,
    modalType,
    entriesToShow,
    deleteImportRequestHandle,
  } = ImportRequestUtilsHook();

  return (
    <>
      <ModalsView
        acceptDeleteImportRequestHandler={() =>
          deleteImportRequestHandle(refetch, store)
        }
        acceptActivateImportRequest={() => console.log("HI")}
        isModalVisible={modalOpen}
        modalClose={showImportModalClose}
        modalType={modalType}
        showEntryModal={{
          closeHandle: showImportModalClose,
          entries: entriesToShow,
        }}
      ></ModalsView>
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
          <span>{Translation("actions")}</span>
        </div>
        <Imports>
          {imports.map((importVal) => (
            <ImportRequestEntry
              key={importVal._id}
              importVal={importVal}
              acceptImportRequest={acceptImportRequest}
              deleteImportRequest={deleteImportRequest}
              showEntriesHandle={showEntriesHandle}
            />
          ))}
        </Imports>
      </ImportRequest>
    </>
  );
};

export default inject("store")(observer(ImportRequestCardView));
