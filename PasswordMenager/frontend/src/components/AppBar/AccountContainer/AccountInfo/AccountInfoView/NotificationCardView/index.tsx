import { useEffect, useState } from "react";
import { Entry } from "../../../../../../utils/entry.utils";
import { Translation } from "../../../../../Translation";
import {
  NotificationElementComponent,
  NotificationHeaderElement,
} from "./NotificationElements";
import NotificationModal from "./NotificationModals";
import { Notification, NotificationList } from "./component.styled";

export const NotificationCardView = () => {
  const [notification, setNotification] = useState<any[]>([]);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [action, setAction] = useState<
    "delete" | "activate" | "suspend" | null
  >(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [notificationForAction, setNotificationForAction] =
    useState<NotificationLike | null>(null);

  useEffect(() => {
    Entry.getInstance()
      .getNumberOfActiveNotification()
      .then((notifications) => setNotification(notifications));
  }, [refetch]);

  const deleteHandle = (notification: NotificationLike) => {
    setAction("delete");
    setModalOpen(true);
    setNotificationForAction(notification);
  };

  const editNotificationHandler = (notification: NotificationLike) => {
    setAction(notification.active ? "suspend" : "activate");
    setModalOpen(true);
    setNotificationForAction(notification);
  };

  const closeMoldaHandler = () => {
    setAction(null);
    setModalOpen(false);
    setNotificationForAction(null);
  };
  return (
    <Notification>
      <NotificationModal
        action={action}
        setRefetch={setRefetch}
        modalOpen={modalOpen}
        notification={notificationForAction}
        closeModal={closeMoldaHandler}
      />
      {Translation("notification.numerMessage", {
        notificationLength: notification.length,
      })}

      <NotificationList>
        <NotificationHeaderElement />
        {notification.map((notifi) => (
          <NotificationElementComponent
            key={notifi?._id}
            notifi={notifi}
            editNotificationHandler={editNotificationHandler}
            deleteHandle={deleteHandle}
          />
        ))}
      </NotificationList>
    </Notification>
  );
};
