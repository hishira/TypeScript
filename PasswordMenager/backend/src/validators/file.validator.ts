import { FileValidator } from '@nestjs/common';

export class CustomFileValidator extends FileValidator<any> {
  constructor(validationOptions: any = {}) {
    super(validationOptions);
  }
  isValid(file?: any): boolean | Promise<boolean> {
    if(file === null && !file.buffer) return false;
    if(!(file.buffer instanceof Buffer)) return false;
    const buffer = file.buffer as Buffer;

    return true;
    
  }
  buildErrorMessage(file: any): string {
    return 'ok';
  }
}
