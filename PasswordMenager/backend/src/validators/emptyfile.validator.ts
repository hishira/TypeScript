import { FileValidator } from '@nestjs/common';

export class EmptyFileValidator extends FileValidator<any> {
  constructor(validationOptions: any = {}) {
    super(validationOptions);
  }
  isValid(file?: Express.Multer.File): boolean | Promise<boolean> {
    const buffer = file.buffer as Buffer;
    return buffer.toString().length !== 0;
  }
  buildErrorMessage(file: Express.Multer.File): string {
    return 'File is empty';
  }
}
