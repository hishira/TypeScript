import { Readable } from 'stream';

export class ExportReader extends Readable {
  constructor(public csvData: string[][]) {
    super();
  }
  override _read(size?: number): void {
    this.push(this.csvData.shift()?.join(','));
    if (!this.csvData.length) {
      this.push(null);
    }
  }
  override _destroy(): this {
    this.csvData = null;
    return this;
  }
}
