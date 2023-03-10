import { SessionStorage } from "../utils/localstorage.utils";
import { Api } from "./config.api";

export class ExportApi extends Api {
  private static instance: ExportApi | null = null;
  private sessionStorage: SessionStorage;

  constructor(sessionStorageInstance: SessionStorage) {
    super();
    this.sessionStorage = sessionStorageInstance;
  }
  static getInstance(): ExportApi {
    if (this.instance === null) {
      this.instance = new ExportApi(SessionStorage.getInstance());
      return this.instance;
    }
    return this.instance;
  }

  async getExportedEntries(): Promise<Response> {
    const url = this.getUrl("export/csv");
    const token = this.sessionStorage.getAccessToken();
    return fetch(url, this.fetchGetObjectWithtoken(token))
  }
}
