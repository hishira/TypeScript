import { FileValidator } from '@nestjs/common';
import { Duplex } from 'stream';
export class CustomFileValidator extends FileValidator<
  Record<string, unknown>
> {
  constructor(validationOptions: Record<string, unknown> = {}) {
    super(validationOptions);
  }
  isValid(file?: Express.Multer.File): boolean | Promise<boolean> {
    const buffer = file.buffer;
    const stream = this.getStream(buffer);
    const chunks = [];
    stream.on('data', (chunk) => {
      chunks.push(chunk);
    });
    stream.on('end', () => {
      console.log(chunks.toString());
    });
    return true;
  }

  buildErrorMessage(file: Express.Multer.File): string {
    return 'Inproper csv file';
  }

  private getStream(buffer: Buffer): Duplex {
    const duplex = new Duplex();
    duplex.push(buffer);
    duplex.push(null);
    return duplex;
  }
}
