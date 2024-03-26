import { FileValidator } from '@nestjs/common';

export class NotFileValidator extends FileValidator<any> {
  constructor(validationOptions: any = {}) {
    super(validationOptions);
  }

  isValid(file?: Express.Multer.File): boolean | Promise<boolean> {
    if (file === null && !file.buffer) return false;
    if (!(file.buffer instanceof Buffer)) return false;
    return true;
  }

  buildErrorMessage(file: any): string {
    return 'Inproper file';
  }
}
