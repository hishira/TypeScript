import { fetchGetObjectWithtoken, getUrl } from "./config.api";

export const ExportEntriesCsv = async (token: string) => {
  const url = getUrl("export/csv");

  return fetch(url, fetchGetObjectWithtoken(token)).then((resp) => {
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
};
