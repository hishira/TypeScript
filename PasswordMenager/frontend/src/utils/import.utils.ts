import { ImportApi } from "../api/import.api";

export class Import {
  private static instance: Import | null = null;
  private importApi: ImportApi;

  constructor(importApiInstance: ImportApi) {
    this.importApi = importApiInstance;
  }

  static getInstance(): Import {
    if (this.instance === null) {
      this.instance = new Import(ImportApi.getInstance());

      return this.instance;
    }

    return this.instance;
  }

  public ImportFile(file: File | FormData, fileSize: number): Promise<unknown> {
    return this.importApi.importFile(file, fileSize);
  }

  public Import(
    file: File | FormData,
    fileSize: number
  ): Promise<{
    entiresToImport: [];
    importRequestId: string;
    numberOfEntriesToAdd: number;
  }> {
    return this.importApi.import(file, fileSize).then((data) => data.json());
  }

  ImportRequest() {
    return this.importApi.importRequests().then((data) => data.json());
  }

  AcceptImportRequest(importRequestString: string) {
    return this.importApi
      .acceptImportRequest(importRequestString)
      .then((data) => data.json());
  }
}
