import { inject, observer } from "mobx-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IGeneral } from "../../../../../../../models/General";
import { AcceptModalComponent } from "../../../../../../Modal/AcceptModal";
import { TranslationFunction } from "../../../../../../Translation";
import {
  ActivateNotification,
  DeleteNotification,
  SuspendNotifcation,
} from "../utils";
import {
  ErrorPopUpObject,
  SuccessPopUpObject,
} from "../../../../../../../utils/popup.utils";

type NotificationModalType = {
  action: "delete" | "activate" | "suspend" | null;
  setRefetch: Dispatch<SetStateAction<boolean>>;
  modalOpen: boolean;
  notification: NotificationLike | null;
};

const ActiveModal = <div>Active notification?</div>;
const SuspendModal = <div>Suspend notification?</div>;
const DeleteModal = <div>Are you sure to delete notification?</div>;

const SelectProperModalText = (
  action: "delete" | "activate" | "suspend" | null
) => {
  return action === "activate"
    ? ActiveModal
    : action === "suspend"
    ? SuspendModal
    : action === "delete"
    ? DeleteModal
    : undefined;
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
  const successSuspendMessage = TranslationFunction(
    "notification.suspend.success"
  );
  const errorSuspendMessage = TranslationFunction("notification.suspend.error");
  const successDeleteMessage = TranslationFunction(
    "notification.delete.success"
  );
  const errorDeleteMessage = TranslationFunction("notification.delete.error");
  const successActivateMessage = TranslationFunction(
    "notification.activete.success"
  );
  const errorActivateMessage = TranslationFunction(
    "notification.activete.error"
  );
  useEffect(() => {
    setModalOpen(modalOpen);
    setComponent(SelectProperModalText(action));
  }, [modalOpen, action]);

  const acceptModalPromiseHandler = () => {
    const acceptHandler =
      action === "activate"
        ? ActivateNotification
        : action === "suspend"
        ? SuspendNotifcation
        : action === "delete"
        ? DeleteNotification
        : null;
    const successMessage =
      action === "activate"
        ? successActivateMessage
        : action === "suspend"
        ? successSuspendMessage
        : successDeleteMessage;
    const errorMessage =
      action === "activate"
        ? errorActivateMessage
        : action === "suspend"
        ? errorSuspendMessage
        : errorDeleteMessage;
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
