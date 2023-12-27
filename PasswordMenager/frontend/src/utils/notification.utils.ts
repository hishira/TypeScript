import { NotificationApi } from "../api/notification.api";
import { SessionStorage } from "./localstorage.utils";

export class Notification {
  private static instance: Notification | null = null;
  private notificationApi: NotificationApi;
  private sessionStorage: SessionStorage;

  constructor(
    notificationApi: NotificationApi,
    sessionStorage: SessionStorage
  ) {
    this.notificationApi = notificationApi;
    this.sessionStorage = sessionStorage;
  }

  static getInstance(): Notification {
    if (this.instance === null) {
      this.instance = new Notification(
        NotificationApi.getInstance(),
        SessionStorage.getInstance()
      );
    }
    return this.instance;
  }

  deleteNofitication(notificationId: string): Promise<any> {
    const token = this.sessionStorage.getAccessToken();
    return this.notificationApi
      .delete(notificationId, token)
      .then((r) => r.json());
  }

  updateNotification(newNotificationBody: EditNotification) {
    const token = this.sessionStorage.getAccessToken();
    return this.notificationApi
      .edit(newNotificationBody, token)
      .then((r) => r.json());
  }
}
