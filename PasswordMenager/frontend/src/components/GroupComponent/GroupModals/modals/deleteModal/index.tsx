import { inject, observer } from "mobx-react";
import { IGeneral } from "../../../../../models/General";
import { Group } from "../../../../../utils/group.utils";
import {
  ErrorPopUpObject,
  SuccessPopUpObject,
} from "../../../../../utils/popup.utils";
import { AcceptModalComponent } from "../../../../Modal/AcceptModal";
import { TranslationFunction } from "../../../../Translation";
import { DeleteModalType } from "../../types";
import { AcceptDeleteModal } from "../acceptModals/acceptDelete";

const DeleteModal = ({
  actionGroup,
  setRefetch,
  store,
}: DeleteModalType & { store?: IGeneral }) => {
  const successDeleteGroupMessage = TranslationFunction(
    "group.deleteToast.success"
  );
  const errorDeleteGroupMessage = TranslationFunction(
    "group.deleteToast.error"
  );
  const deleteClickHandle = () => {
    Group.getInstance()
      .DeleteUserGroup(actionGroup.actionGroupId)
      .then((response) => {
        setRefetch((a) => !a);
        actionGroup.setDeleteModal(false);
        store?.setPopUpinfo(SuccessPopUpObject(successDeleteGroupMessage));
      })
      .catch((e) => {
        store?.setPopUpinfo(ErrorPopUpObject(errorDeleteGroupMessage));
        actionGroup.setDeleteModal(false);
      });
  };
  return actionGroup.deleteModal ? (
    <AcceptModalComponent
      visible={actionGroup.deleteModal}
      onClose={() => actionGroup.setDeleteModal(false)}
      acceptHandle={deleteClickHandle}
      component={<AcceptDeleteModal />}
    />
  ) : null;
};

export default inject("store")(observer(DeleteModal));
