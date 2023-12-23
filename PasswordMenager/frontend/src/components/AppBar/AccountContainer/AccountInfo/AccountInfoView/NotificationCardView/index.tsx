import { Translation } from "../../../../../Translation";
import { DeleteIcon } from "../../../../../icons/DeleteIcon";
import { EditIcon } from "../../../../../icons/EditIcon";
import {
  Notification,
  NotificationElement,
  NotificationList,
  NotificationSubElement,
} from "./component.styled";

export const NotificationCardView = ({
  notification,
}: {
  notification: any[];
}) => {
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
              <EditIcon ></EditIcon>
              <DeleteIcon></DeleteIcon>
            </NotificationSubElement>
          </NotificationElement>
        ))}
      </NotificationList>
    </Notification>
  );
};
