import { FileValidator } from '@nestjs/common';

export class NotFileValidator extends FileValidator<Record<string, unknown>> {
  constructor(validationOptions: Record<string, unknown> = {}) {
    super(validationOptions);
  }

  isValid(file?: Express.Multer.File): boolean | Promise<boolean> {
    if (file === null && !file.buffer) return false;
    if (!(file.buffer instanceof Buffer)) return false;
    return true;
  }

  buildErrorMessage(file: Express.Multer.File): string {
    return 'Inproper file';
  }
}
