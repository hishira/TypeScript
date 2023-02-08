import { FileValidator } from "@nestjs/common";

export class EmptyFileValidator extends FileValidator<any>{
    
    constructor(validationOptions: any = {}){
        super(validationOptions);
    }
    isValid(file?: any): boolean | Promise<boolean> {
       const buffer = file.buffer as Buffer;
       return buffer.toString().length !== 0;
    }
    buildErrorMessage(file: any): string {
        return "File is empty"
    }
    
    
}