import { useEffect, useState } from "react";
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
import { Entry } from "../../../../../../utils/entry.utils";

export const NotificationCardView = () => {
  const [notification, setNotification] = useState<any[]>([]);
  const [refetch, setRefetch] = useState<boolean>(false);
  useEffect(() => {
    Entry.getInstance()
      .getNumberOfActiveNotification()
      .then((notifications) => setNotification(notifications));
  }, [refetch]);
  const deleteHandle = (notificationId: string) => {
    NotificationUtil.getInstance()
      .deleteNofitication(notificationId)
      .then((_) => setRefetch((a) => !a));
  };
  return (
    <Notification>
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
              <EditIcon></EditIcon>
              <DeleteIcon click={() => deleteHandle(notifi._id)}></DeleteIcon>
            </NotificationSubElement>
          </NotificationElement>
        ))}
      </NotificationList>
    </Notification>
  );
};
