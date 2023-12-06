import { Readable } from 'stream';

export class ExportReader extends Readable {
  constructor(public csvData: string[][]) {
    super();
  }
  override _read(size?: number) {
    this.push(this.csvData.shift()?.join(','));
    if (!this.csvData.length) {
      this.push(null);
    }
  }
  override _destroy() {
    this.csvData = null;
    return this;
  }
}
