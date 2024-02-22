import { inject, observer } from "mobx-react";
import { Dispatch, SetStateAction } from "react";
import { NotificationMessages } from "../../../../../../../hooks/notificationMessages.hook";
import { IGeneral } from "../../../../../../../models/General";
import {
  ErrorPopUpObject,
  SuccessPopUpObject,
} from "../../../../../../../utils/popup.utils";
import { AcceptModalComponent } from "../../../../../../Modal/AcceptModal";
import { ActionHandlerMapper } from "./mappers";
import { NotificationHook } from "./notification.hook";

type NotificationModalType = {
  action: "delete" | "activate" | "suspend" | null;
  setRefetch: Dispatch<SetStateAction<boolean>>;
  modalOpen: boolean;
  notification: NotificationLike | null;
  closeModal: () => void;
};

const NotificationModal = ({
  action,
  setRefetch,
  modalOpen,
  notification,
  closeModal,
  store,
}: NotificationModalType & { store?: IGeneral }) => {
  const { successMessage, errorMessage } = NotificationMessages(action);
  const { component, isModalOpen, setModalOpen } = NotificationHook(
    modalOpen,
    action
  );
  const acceptModalPromiseHandler = () => {
    const acceptHandler = ActionHandlerMapper[action ?? ""];
    if (!acceptHandler || !notification) return;
    acceptHandler(notification)
      ?.then((_) => {
        setRefetch((a) => !a);
        store?.setPopUpinfo(SuccessPopUpObject(successMessage));
      })
      .catch((e) => {
        store?.setPopUpinfo(ErrorPopUpObject(errorMessage));
      });
      setModalOpen(false);
  };
  const close = () => {
    setModalOpen(false);
    closeModal();
  };
  if (!isModalOpen) return null;
  return (
    <AcceptModalComponent
      visible={isModalOpen}
      acceptHandle={acceptModalPromiseHandler}
      onClose={() => close()}
      component={component}
    />
  );
};

export default inject("store")(observer(NotificationModal));
