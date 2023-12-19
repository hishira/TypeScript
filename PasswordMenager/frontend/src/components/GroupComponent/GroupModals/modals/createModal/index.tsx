import { inject, observer } from "mobx-react";
import { useState } from "react";
import { IGeneral } from "../../../../../models/General";
import { Group } from "../../../../../utils/group.utils";
import {
  ErrorPopUpObject,
  SuccessPopUpObject,
} from "../../../../../utils/popup.utils";
import Modal from "../../../../Modal/";
import { TranslationFunction } from "../../../../Translation";
import NewGroupComponent from "../../../NewGroupComponent";
import { CreateModalType } from "../../types";

type NewGroupComponentProps = {
  setgroupdto: React.Dispatch<React.SetStateAction<CreateGroup>>;
  buttonHandleClick: () => void;
  groupdto: CreateGroup;
};
const NewGroupComponenet = ({
  setgroupdto,
  buttonHandleClick,
  groupdto,
}: NewGroupComponentProps): JSX.Element => (
  <NewGroupComponent
    func={(e: React.ChangeEvent<HTMLInputElement>) =>
      setgroupdto({ name: e.target.value })
    }
    buttonhandle={buttonHandleClick}
    isButtonDisabled={groupdto.name === ""}
  />
);

const CreateModal = ({
  actionGroup,
  newGroupCloseHandle,
  setRefetch,
  store,
}: CreateModalType & { store?: IGeneral }) => {
  const [groupdto, setGroupDto] = useState<CreateGroup>({ name: "" });
  const successCreateGroupMessage = TranslationFunction(
    "group.createToast.success"
  );
  const errorCreateGroupMessage = TranslationFunction(
    "group.createToast.error"
  );
  const buttonHandleClick = async (): Promise<void> => {
    Group.getInstance()
      .CreateGroupForUser(groupdto)
      .then((resp) => {
        setRefetch((a) => !a);
        actionGroup.setCreateModal(false);
        setGroupDto({ name: "" });
        store?.setPopUpinfo(SuccessPopUpObject(successCreateGroupMessage));
      })
      .catch((_) => {
        store?.setPopUpinfo(ErrorPopUpObject(errorCreateGroupMessage));
      });
  };
  return actionGroup.createModal ? (
    <Modal
      visible={actionGroup.createModal}
      onClose={newGroupCloseHandle}
      component={NewGroupComponenet({
        setgroupdto: setGroupDto,
        buttonHandleClick,
        groupdto,
      })}
    />
  ) : null;
};

export default inject("store")(observer(CreateModal));
