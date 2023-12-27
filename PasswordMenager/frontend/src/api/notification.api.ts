import { Api } from "./config.api";

export class NotificationApi extends Api {
  private static instance: NotificationApi | null = null;

  static getInstance(): NotificationApi {
    if (this.instance === null) {
      this.instance = new NotificationApi();
    }
    return this.instance;
  }

  delete(notificationId: string, accessToken: string): Promise<Response> {
    const url = this.getUrl(`notification/delete/${notificationId}`);
    return fetch(url, this.fetchDeleteObjectWithToken(accessToken));
  }

  edit(
    notificationBody: EditNotification,
    accessToken: string
  ): Promise<Response> {
    const url = this.getUrl("notification/edit");
    return fetch(
      url,
      this.fetchPutObjectWithToken(notificationBody, accessToken)
    );
  }
}
