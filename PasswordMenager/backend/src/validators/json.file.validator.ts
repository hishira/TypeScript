import { FileValidator } from '@nestjs/common';
import { Duplex } from 'stream';
export class JSONFileValidator extends FileValidator<any> {
  constructor(validationOptions: any = {}) {
    super(validationOptions);
  }

  isValid(file?: Express.Multer.File): boolean | Promise<boolean> {
    const buffer = file.buffer;
    const stream = this.getStream(buffer);
    const chunks = [];
    return new Promise<boolean>((resolve, reject) => {
      stream.on('data', (chunk) => {
        chunks.push(chunk);
      });
      stream.on('end', () => {
        const chunksString = chunks.toString();
        try {
          JSON.parse(chunksString);
        } catch (e) {
          resolve(false);
        }
        resolve(true);
      });
    });
  }
  buildErrorMessage(file: any): string {
    return 'Cannot parse json file';
  }

  private getStream(buffer: Buffer): Duplex {
    const duplex = new Duplex();
    duplex.push(buffer);
    duplex.push(null);
    return duplex;
  }
}
