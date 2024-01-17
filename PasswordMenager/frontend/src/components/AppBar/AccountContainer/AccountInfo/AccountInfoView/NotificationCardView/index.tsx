import { useEffect, useState } from "react";
import { Entry } from "../../../../../../utils/entry.utils";
import { Translation } from "../../../../../Translation";
import { DeleteIcon } from "../../../../../icons/DeleteIcon";
import { EditIcon } from "../../../../../icons/EditIcon";
import NotificationModal from "./NotificationModals";
import {
  Notification,
  NotificationElement,
  NotificationList,
  NotificationSubElement,
} from "./component.styled";

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

  return (
    <Notification>
      <NotificationModal
        action={action}
        setRefetch={setRefetch}
        modalOpen={modalOpen}
        notification={notificationForAction}
      />
      {Translation("notification.numerMessage", {
        notificationLength: notification.length,
      })}

      <NotificationList>
        <NotificationElement>
          <NotificationSubElement>
            {Translation("notification.title")}
          </NotificationSubElement>
          <NotificationSubElement>
            {Translation("notification.data")}
          </NotificationSubElement>
          <NotificationSubElement>
            {Translation("notification.type")}
          </NotificationSubElement>
          <NotificationSubElement>
            {Translation("notification.state")}
          </NotificationSubElement>
          <NotificationSubElement></NotificationSubElement>
        </NotificationElement>
        {notification.map((notifi) => (
          <NotificationElement key={notifi?._id}>
            <NotificationSubElement>
              {notifi?.entryId?.title}
            </NotificationSubElement>
            <NotificationSubElement>
              {notifi?.notificationDate}
            </NotificationSubElement>
            <NotificationSubElement>
              {notifi?.notificationChannel}
            </NotificationSubElement>
            <NotificationSubElement>
              {notifi?.active ? Translation("active") : Translation("suspend")}
            </NotificationSubElement>
            <NotificationSubElement>
              <EditIcon
                click={() => editNotificationHandler(notifi)}
              ></EditIcon>
              <DeleteIcon click={() => deleteHandle(notifi)}></DeleteIcon>
            </NotificationSubElement>
          </NotificationElement>
        ))}
      </NotificationList>
    </Notification>
  );
};
