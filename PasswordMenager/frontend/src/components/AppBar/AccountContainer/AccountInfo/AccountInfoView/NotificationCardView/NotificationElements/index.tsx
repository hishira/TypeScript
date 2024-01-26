import { Translation } from "../../../../../../Translation";
import { DeleteIcon } from "../../../../../../icons/DeleteIcon";
import { EditIcon } from "../../../../../../icons/EditIcon";
import {
    NotificationElement,
    NotificationSubElement,
} from "../component.styled";

export const NotificationHeaderElement = () => (
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
);

export const NotificationElementComponent = ({
  notifi,
  editNotificationHandler,
  deleteHandle,
}: {
  notifi: any;
  editNotificationHandler: (notifi: NotificationLike) => void;
  deleteHandle: (notifi: NotificationLike) => void;
}) => (
  <NotificationElement>
    <NotificationSubElement>{notifi?.entryId?.title}</NotificationSubElement>
    <NotificationSubElement>{notifi?.notificationDate}</NotificationSubElement>
    <NotificationSubElement>
      {notifi?.notificationChannel}
    </NotificationSubElement>
    <NotificationSubElement>
      {notifi?.active ? Translation("active") : Translation("suspend")}
    </NotificationSubElement>
    <NotificationSubElement>
      <EditIcon click={() => editNotificationHandler(notifi)}></EditIcon>
      <DeleteIcon click={() => deleteHandle(notifi)}></DeleteIcon>
    </NotificationSubElement>
  </NotificationElement>
);
