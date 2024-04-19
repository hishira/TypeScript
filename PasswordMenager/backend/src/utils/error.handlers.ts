import { Logger } from './Logger';

export interface LoggerContext {
  logger: Logger;
}
export class ErrorHandler {
  constructor(private readonly classContext: LoggerContext) {}

  handle<T>(error: T, contextName: string): T {
    this.classContext.logger.error(error);
    return error;
  }
}
