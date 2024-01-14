import { useState } from "react";
import { ModalOpenUtils } from "../../../../../../utils/moda.open.utils";
import { Translation } from "../../../../../Translation";
import { DeleteIcon } from "../../../../../icons/DeleteIcon";
import { ShowIcon } from "../../../../../icons/ShowIcon";
import { TuroOnIcon } from "../../../../../icons/TurnOnIcon";
import { ModalsView } from "./ModalsView";
import { Actions, ImportRequest, Imports } from "./component.styled";

export const ImportRequestCardView = ({
  imports,
}: {
  imports: ImportRequestData[];
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [entriesToShow, setEntriesToShow] = useState<EntriesToImport[]>([]);
  const [modalType, setModalType] = useState<"show" | "delete" | "activate">(
    "show"
  );
  // const activateImportRequest = (importRequestId: string) => {
  //   Import.getInstance().AcceptImportRequest(importRequestId).then(console.log);
  // };
  const showEntriesHandle = (entries: EntriesToImport[]) => {
    setEntriesToShow(entries);
    setModalType("show");
    setModalOpen(true);
    ModalOpenUtils.getInstance().CloseModal = true;
  };

  const deleteImportRequest = (importRequestId: string) => {
    setModalType("delete");
    setModalOpen(true);
  };

  const acceptImportRequest = (importRequestId: string) => {
    setModalType("activate");
    setModalOpen(true);
    ModalOpenUtils.getInstance().CloseModal = true;
  };

  const showImportModalClose = () => {
    setModalOpen(false);
    ModalOpenUtils.getInstance().CloseModal = false;
  };

  return (
    <>
      <ModalsView
        acceptDeleteImportRequestHandler={() => console.log("HI")}
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
                  click={() => acceptImportRequest(importVal._id)}
                ></TuroOnIcon>
                <ShowIcon
                  click={() => showEntriesHandle(importVal.entriesToImport)}
                ></ShowIcon>
                <DeleteIcon
                  click={() => deleteImportRequest(importVal._id)}
                ></DeleteIcon>
              </Actions>
            </div>
          ))}
        </Imports>
      </ImportRequest>
    </>
  );
};
