import { NotificationApi } from "../api/notification.api";
import { SessionStorage } from "./localstorage.utils";

export class NotificationUtil {
  private static instance: NotificationUtil | null = null;
  private notificationApi: NotificationApi;
  private sessionStorage: SessionStorage;

  private constructor(
    notificationApi: NotificationApi,
    sessionStorage: SessionStorage
  ) {
    this.notificationApi = notificationApi;
    this.sessionStorage = sessionStorage;
  }

  static getInstance(): NotificationUtil {
    if (this.instance === null) {
      this.instance = new NotificationUtil(
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
