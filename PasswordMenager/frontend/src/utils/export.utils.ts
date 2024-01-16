import { ExportApi } from "../api/export.api";
import { DocumentUtils } from "./document.utils";

export class Export {
  private static instance: Export | null = null;
  private exportApi: ExportApi;
  private documentUtils: DocumentUtils;

  private constructor(
    exportApiInstance: ExportApi,
    documentUtilsInstance: DocumentUtils
  ) {
    this.exportApi = exportApiInstance;
    this.documentUtils = documentUtilsInstance;
  }

  static getInstance(): Export {
    if (this.instance === null) {
      this.instance = new Export(
        ExportApi.getInstance(),
        DocumentUtils.getInstance()
      );
      return this.instance;
    }
    return this.instance;
  }

  async ExportEntriesCsv(): Promise<void> {
    return this.exportApi.getExportedEntries().then((resp) => {
      resp.blob().then((resp) => this.downloadFile(resp, "entries.csv"));
    });
  }

  async ExportEncrypted(): Promise<unknown> {
    return this.exportApi.getEncryptedFile().then((resp) => {
      resp.blob().then((file) => this.downloadFile(file, "entries.xyz"));
    });
  }

  async ExportJson(): Promise<unknown> {
    return this.exportApi.getExportedEntriesAsJson().then((resp) => {
      resp.blob().then((file) => this.downloadFile(file, "entries.json"));
    });
  }

  private downloadFile(blob: Blob, filename: string) {
    const csvUrl = URL.createObjectURL(blob);
    const anchor = this.documentUtils.createDownloableLink(csvUrl, filename);
    this.documentUtils.addChildElement(anchor);
    anchor.click();
    this.documentUtils.removeChildElement(anchor);
    URL.revokeObjectURL(csvUrl);
  }
}
