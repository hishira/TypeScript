import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger {
  logMessage(message: string) {
    this.log(message, this.context);
  }
}
