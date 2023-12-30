import { NotificationUtil } from "../../../../../../utils/notification.utils";

export const ActivateNotification = (notification: {
  _id: string;
}): Promise<object> => {
  const activeBody: EditNotification = {
    _id: notification._id,
    active: true,
  };
  return NotificationUtil.getInstance().updateNotification(activeBody);
};

export const SuspendNotifcation = (notification: {
  _id: string;
}): Promise<object> => {
  const suspendBody: EditNotification = {
    _id: notification._id,
    active: false,
  };
  return NotificationUtil.getInstance().updateNotification(suspendBody);
};

export const DeleteNotification = (notification: {_id: string}): Promise<object>=>{
  return NotificationUtil.getInstance().deleteNofitication(notification._id);
}