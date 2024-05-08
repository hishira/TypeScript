import { FileValidator } from '@nestjs/common';
import { Duplex } from 'stream';
enum JsonErrorsType {
  EMPTY = 'empty',
  PARSE = 'parse',
  FORMAT = 'format',
}
export class JSONFileValidator extends FileValidator<Record<string, unknown>> {
  ErrorsMapper: { [key in JsonErrorsType]: string } = {
    empty: 'JSON file is empty',
    parse: 'Cannot parse json file',
    format: 'Wrong json format',
  };
  currectErrorMessage = this.ErrorsMapper[JsonErrorsType.EMPTY];
  constructor(validationOptions: Record<string, unknown> = {}) {
    super(validationOptions);
  }

  isValid(file?: Express.Multer.File): boolean | Promise<boolean> {
    const buffer = file.buffer;
    return this.preparePromiseFileValidation(buffer);
  }
  buildErrorMessage(file: Express.Multer.File): string {
    return this.currectErrorMessage;
  }

  private preparePromiseFileValidation(buffer: Buffer): Promise<boolean> {
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
          if (chunksString.length === 0) {
            this.currectErrorMessage = this.ErrorsMapper[JsonErrorsType.FORMAT];
            resolve(false);
          }
        } catch (e) {
          this.currectErrorMessage = this.ErrorsMapper[JsonErrorsType.PARSE];
          resolve(false);
        }
        resolve(true);
      });
    });
  }

  private getStream(buffer: Buffer): Duplex {
    const duplex = new Duplex();
    duplex.push(buffer);
    duplex.push(null);
    return duplex;
  }
}
