import { SessionStorage } from "../utils/localstorage.utils";
import { Api } from "./config.api";

export class ImportApi extends Api {
  private static instance: ImportApi | null = null;
  private sessionStorage: SessionStorage;

  constructor(sessionStorageInstance: SessionStorage) {
    super();
    this.sessionStorage = sessionStorageInstance;
  }

  static getInstance(): ImportApi {
    if (this.instance === null) {
      this.instance = new ImportApi(SessionStorage.getInstance());
      return this.instance;
    }

    return this.instance;
  }

  async importFile(file: File | FormData, filesize: number): Promise<Response> {
    const url = this.getUrl("export/decrypt");
    const token = this.sessionStorage.getAccessToken();

    return fetch(url, this.fetchPostFileWithToken(file, token, filesize));
  }

  import(file: File | FormData, filesize: number): Promise<Response> {
    const url = this.getUrl("import/checkCsv");

    const token = this.sessionStorage.getAccessToken();
    return fetch(url, this.fetchPostFileWithToken(file, token, filesize));
  }
}
