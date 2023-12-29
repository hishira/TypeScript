import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AcceptModalComponent } from "../../../../../../Modal/AcceptModal";

type NotificationModalType = {
  action: "delete" | "activate" | "suspend" | null;
  acceptHandler: Promise<any> | null;
  setRefetch: Dispatch<SetStateAction<boolean>>;
  modalOpen: boolean;
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
  acceptHandler,
  setRefetch,
  modalOpen,
}: NotificationModalType) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [component, setComponent] = useState<JSX.Element | undefined>(
    undefined
  );
  useEffect(() => {
    setModalOpen(modalOpen);
    setComponent(SelectProperModalText(action));
  }, [modalOpen]);

  const acceptModalPromiseHandler = () =>
    acceptHandler?.then((_) => setRefetch((a) => !a));
  return isModalOpen ? (
    <AcceptModalComponent
      visible={isModalOpen}
      acceptHandle={acceptModalPromiseHandler}
      onClose={() => setModalOpen((a) => !a)}
      component={component}
    />
  ) : null;
};

export default NotificationModal;
