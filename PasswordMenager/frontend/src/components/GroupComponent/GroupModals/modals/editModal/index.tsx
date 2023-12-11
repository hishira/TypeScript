import { useState } from "react";
import { AcceptModalComponent } from "../../../../Modal/AcceptModal";
import { EditModalType } from "../../types";
import { AcceptEditModal } from "../acceptModals/acceptEdit";

export const EditModal = ({ actionGroup, editHandle }: EditModalType) => {
  const [groupName, setGroupName] = useState<string>("");
  const closeHandle = () => {
    actionGroup.setEditModal(false);
    setGroupName("");
  };
  return actionGroup.editModal ? (
    <AcceptModalComponent
      visible={actionGroup.editModal}
      onClose={() => closeHandle()}
      acceptHandle={() => editHandle(groupName)}
      disableButton={groupName === ""}
      component={
        <AcceptEditModal newName={groupName} setNewName={setGroupName} />
      }
    />
  ) : null;
};
