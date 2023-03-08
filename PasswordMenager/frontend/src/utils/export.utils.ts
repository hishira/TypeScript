import { ExportApi } from "../api/export.api";

export class Export {
  private static instance: Export | null = null;
  private exportApi: ExportApi;

  constructor(exportApiInstance: ExportApi) {
    this.exportApi = exportApiInstance;
  }

  static getInstance(): Export {
    if (this.instance === null) {
      this.instance = new Export(ExportApi.getInstance());
      return this.instance;
    }
    return this.instance;
  }

  async ExportEntriesCsv(): Promise<void> {
    return this.exportApi.getExportedEntries().then((resp) => {
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
