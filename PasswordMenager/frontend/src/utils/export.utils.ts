import { ExportApi } from "../api/export.api";
import { DocumentUtils } from "./document.utils";

export class Export {
  private static instance: Export | null = null;
  private exportApi: ExportApi;
  private documentUtils: DocumentUtils;
  constructor(
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
      resp.blob().then((resp) => {
        const csvUrl = URL.createObjectURL(resp);
        const anchor = this.documentUtils.createDownloableLink(
          csvUrl,
          "entries.csv"
        );
        this.documentUtils.addChildElement(anchor);
        anchor.click();
        this.documentUtils.removeChildElement(anchor);
        URL.revokeObjectURL(csvUrl);
      });
    });
  }
}
