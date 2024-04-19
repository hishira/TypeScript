import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger {
  logMessage(message: string): void {
    this.log(message, this.context);
  }
}
