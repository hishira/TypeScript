import { Notification } from "./component.styled";

export const NotificationCardView = ({
  notification,
}: {
  notification: any[];
}) => {
  // TODO: Add notification which expire password
  return (
    <Notification>
      Number of active notification for {notification.length} entries
    </Notification>
  );
};
