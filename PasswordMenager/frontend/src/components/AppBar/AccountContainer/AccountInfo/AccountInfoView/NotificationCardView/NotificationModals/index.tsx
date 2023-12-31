import { inject, observer } from "mobx-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NotificationMessages } from "../../../../../../../hooks/notificationMessages.hook";
import { IGeneral } from "../../../../../../../models/General";
import {
  ErrorPopUpObject,
  SuccessPopUpObject,
} from "../../../../../../../utils/popup.utils";
import { AcceptModalComponent } from "../../../../../../Modal/AcceptModal";
import { ActionHandlerMapper, ComponentMapper } from "./mappers";

type NotificationModalType = {
  action: "delete" | "activate" | "suspend" | null;
  setRefetch: Dispatch<SetStateAction<boolean>>;
  modalOpen: boolean;
  notification: NotificationLike | null;
};

const SelectProperModalText = (
  action: "delete" | "activate" | "suspend" | null
) => {
  return ComponentMapper[action ?? ""];
};
const NotificationModal = ({
  action,
  setRefetch,
  modalOpen,
  notification,
  store,
}: NotificationModalType & { store?: IGeneral }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [component, setComponent] = useState<JSX.Element | undefined>(
    undefined
  );
  const { successMessage, errorMessage } = NotificationMessages(action);
  useEffect(() => {
    setModalOpen(modalOpen);
    setComponent(SelectProperModalText(action));
  }, [modalOpen, action]);

  const acceptModalPromiseHandler = () => {
    const acceptHandler = ActionHandlerMapper[action ?? ""];
    if (acceptHandler && notification) {
      acceptHandler(notification)
        ?.then((_) => {
          setRefetch((a) => !a);
          store?.setPopUpinfo(SuccessPopUpObject(successMessage));
        })
        .catch((e) => {
          store?.setPopUpinfo(ErrorPopUpObject(errorMessage));
        });
      setModalOpen(false);
    }
  };
  return isModalOpen ? (
    <AcceptModalComponent
      visible={isModalOpen}
      acceptHandle={acceptModalPromiseHandler}
      onClose={() => setModalOpen(false)}
      component={component}
    />
  ) : null;
};

export default inject("store")(observer(NotificationModal));
