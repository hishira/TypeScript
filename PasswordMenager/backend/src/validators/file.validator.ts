import { FileValidator } from '@nestjs/common';
import { Duplex, Readable } from 'stream';
export class CustomFileValidator extends FileValidator<any> {
  constructor(validationOptions: any = {}) {
    super(validationOptions);
  }
  isValid(file?: any): boolean | Promise<boolean> {
    const buffer = file.buffer as Buffer;
    //const stream = Readable.from(buffer);
    //stream.on('data', (chunk)=>console.log(chunk));
    const stream = this.getStream(buffer);
    let counter=0;
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk))
    .on('end',(_)=>{
      let tmpBuf = Buffer.concat(chunks);
      console.log(tmpBuf.toString('utf-8'))
    });
    return false;
  }

  buildErrorMessage(file: any): string {
    return 'Inproper csv file';
  }

  private getStream(buffer: Buffer): Duplex {
    const duplex = new Duplex();
    duplex.push(buffer);
    duplex.push(null);
    return duplex;
  }
}
