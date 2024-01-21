import { inject, observer } from "mobx-react";
import { Dispatch, SetStateAction, useState } from "react";
import { IGeneral } from "../../../../../../models/General";
import { Import } from "../../../../../../utils/import.utils";
import { ModalOpenUtils } from "../../../../../../utils/moda.open.utils";
import {
  ErrorPopUpObject,
  SuccessPopUpObject,
} from "../../../../../../utils/popup.utils";
import { Translation } from "../../../../../Translation";
import { DeleteIcon } from "../../../../../icons/DeleteIcon";
import { ShowIcon } from "../../../../../icons/ShowIcon";
import { TuroOnIcon } from "../../../../../icons/TurnOnIcon";
import { ModalsView } from "./ModalsView";
import { Actions, ImportRequest, Imports } from "./component.styled";

const ImportRequestCardView = ({
  imports,
  store,
  refetch,
}: {
  imports: ImportRequestData[];
  store?: IGeneral;
  refetch: Dispatch<SetStateAction<boolean>>;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [entriesToShow, setEntriesToShow] = useState<EntriesToImport[]>([]);
  const [modalType, setModalType] = useState<"show" | "delete" | "activate">(
    "show"
  );
  const [actionImportRequest, setActionImportRequest] = useState<
    string | undefined
  >(undefined);
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
    setActionImportRequest(importRequestId);
    setModalOpen(true);
  };

  const acceptImportRequest = (importRequestId: string) => {
    setModalType("activate");
    setModalOpen(true);
    ModalOpenUtils.getInstance().CloseModal = true;
  };

  const showImportModalClose = () => {
    setModalOpen(false);
    setActionImportRequest(undefined);
    ModalOpenUtils.getInstance().CloseModal = false;
  };

  const deleteImportRequestHandle = () => {
    if (actionImportRequest === undefined) return;
    Import.getInstance()
      .DeleteImportRequest(actionImportRequest)
      .then((r) => {
        if (r.status >= 200 && r.status <= 299) {
          store?.setPopUpinfo(
            SuccessPopUpObject("Import request successfull deleted")
          );
          refetch((a) => !a);
        } else {
          store?.setPopUpinfo(
            ErrorPopUpObject("Error occurs while deleting import request")
          );
        }
        showImportModalClose();
      });
  };

  return (
    <>
      <ModalsView
        acceptDeleteImportRequestHandler={deleteImportRequestHandle}
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

export default inject("store")(observer(ImportRequestCardView));
