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
          </NotificationElement>
        ))}
      </NotificationList>
    </Notification>
  );
};
