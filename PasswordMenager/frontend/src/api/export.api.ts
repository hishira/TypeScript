import { SessionStorage } from "../utils/localstorage.utils";
import { Api } from "./config.api";

export class Export extends Api {
  private static instance: Export | null = null;
  private sessionStorage: SessionStorage;

  constructor(sessionStorageInstance: SessionStorage) {
    super();
    this.sessionStorage = sessionStorageInstance;
  }
  static getInstance(): Export {
    if (this.instance === null) {
      this.instance = new Export(SessionStorage.getInstance());
      return this.instance;
    }
    return this.instance;
  }

  async ExportEntriesCsv(): Promise<void> {
    const url = this.getUrl("export/csv");
    const token = this.sessionStorage.getAccessToken();
    return fetch(url, this.fetchGetObjectWithtoken(token)).then((resp) => {
      resp.blob().then((resp) => {
        const csvUrl = URL.createObjectURL(resp);
        const anchor = document.createElement("a");
        anchor.href = csvUrl;
        anchor.download = "entries.csv";
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(csvUrl);
      });
    });
  }
}
