import { inject, observer } from "mobx-react";
import { useState } from "react";
import { IGeneral } from "../../../../../models/General";
import { Group } from "../../../../../utils/group.utils";
import {
  ErrorPopUpObject,
  SuccessPopUpObject,
} from "../../../../../utils/popup.utils";
import { AcceptModalComponent } from "../../../../Modal/AcceptModal";
import { TranslationFunction } from "../../../../Translation";
import { EditModalType } from "../../types";
import { AcceptEditModal } from "../acceptModals/acceptEdit";

const EditModal = ({
  actionGroup,
  store,
  setRefetch,
}: EditModalType & { store?: IGeneral }) => {
  const [groupName, setGroupName] = useState<string>("");
  const closeHandle = () => {
    actionGroup.setEditModal(false);
    setGroupName("");
  };
  const successEditGroupMessage = TranslationFunction(
    "group.editToast.success"
  );
  const errorEditGroupMessage = TranslationFunction("group.editToast.error");

  const editGroupHandle = (groupName: string): void => {
    Group.getInstance()
      .EditUserGroup(actionGroup.actionGroupId, {
        name: groupName,
      })
      .then((response) => {
        setRefetch((a) => !a);
        actionGroup.setEditModal(false);
        store?.setPopUpinfo(SuccessPopUpObject(successEditGroupMessage));
      })
      .catch((e) => {
        e && console.error(e);
        store?.setPopUpinfo(ErrorPopUpObject(errorEditGroupMessage));
      });
  };

  return actionGroup.editModal ? (
    <AcceptModalComponent
      visible={actionGroup.editModal}
      onClose={() => closeHandle()}
      acceptHandle={() => editGroupHandle(groupName)}
      disableButton={groupName === ""}
      component={
        <AcceptEditModal newName={groupName} setNewName={setGroupName} />
      }
    />
  ) : null;
};

export default inject("store")(observer(EditModal));
