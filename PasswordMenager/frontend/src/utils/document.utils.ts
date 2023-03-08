export class DocumentUtils {
  private static instance: DocumentUtils | null = null;

  private _document: Document;

  constructor() {
    this._document = document;
  }

  static getInstance(): DocumentUtils {
    if (this.instance === null) {
      this.instance = new DocumentUtils();
      return this.instance;
    }
    return this.instance;
  }
  createDownloableLink(objectUrl: string, fileName: string): HTMLAnchorElement {
    const anchor = this._document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = fileName;
    return anchor;
  }

  addChildElement<T extends Node>(node: T) {
    this._document.body.appendChild(node);
  }
  removeChildElement<T extends Node>(node: T) {
    this._document.body.removeChild(node);
  }
}
