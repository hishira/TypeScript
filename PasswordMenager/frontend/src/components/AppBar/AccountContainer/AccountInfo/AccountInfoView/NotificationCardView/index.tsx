import { useEffect, useState } from "react";
import { Entry } from "../../../../../../utils/entry.utils";
import { NotificationUtil } from "../../../../../../utils/notification.utils";
import { Translation } from "../../../../../Translation";
import { DeleteIcon } from "../../../../../icons/DeleteIcon";
import { EditIcon } from "../../../../../icons/EditIcon";
import {
  Notification,
  NotificationElement,
  NotificationList,
  NotificationSubElement,
} from "./component.styled";
import { ActivateNotification, SuspendNotifcation } from "./utils";
import NotificationModal from "./NotificationModals";

export const NotificationCardView = () => {
  const [notification, setNotification] = useState<any[]>([]);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [action, setAction] = useState<
    "delete" | "activate" | "suspend" | null
  >(null);
  const [acceptHandler, setAcceptHandler] = useState<Promise<any> | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  useEffect(() => {
    Entry.getInstance()
      .getNumberOfActiveNotification()
      .then((notifications) => setNotification(notifications));
  }, [refetch]);
  const deleteHandle = (notificationId: string) => {
    setAction("delete");
    setModalOpen(true);
    const acceptHandler =
      NotificationUtil.getInstance().deleteNofitication(notificationId);
    //.then((_) => setRefetch((a) => !a));
    setAcceptHandler(acceptHandler);
  };

  const editNotificationHandler = (notification: {
    _id: string;
    active: boolean;
  }) => {
    const handler = notification.active
      ? SuspendNotifcation
      : ActivateNotification;
    setAction(notification.active ? "suspend" : "activate");
    setModalOpen(true);
    const acceptHandler = handler(notification); //.then((_) => setRefetch((a) => !a));
    setAcceptHandler(acceptHandler);
  };
  return (
    <Notification>
      <NotificationModal
        action={action}
        acceptHandler={acceptHandler}
        setRefetch={setRefetch}
        modalOpen={modalOpen}
      />
      Number of active notification for {notification.length} entries
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
          <NotificationSubElement>Type</NotificationSubElement>
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
              {notifi?.active ? "Active" : "Suspended"}
            </NotificationSubElement>
            <NotificationSubElement>
              <EditIcon
                click={() => editNotificationHandler(notifi)}
              ></EditIcon>
              <DeleteIcon click={() => deleteHandle(notifi._id)}></DeleteIcon>
            </NotificationSubElement>
          </NotificationElement>
        ))}
      </NotificationList>
    </Notification>
  );
};
