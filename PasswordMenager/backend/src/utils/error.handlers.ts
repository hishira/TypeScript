import { Logger } from './Logger';

export interface LoggerHandler {
  handle<T>(handleObject: T | undefined, context: string): T;
}
export interface LoggerContext {
  logger: Logger;
}
export class ErrorHandler implements LoggerHandler {
  constructor(private readonly classContext: LoggerContext) {}

  handle<T>(error: T, contextName: string): T {
    this.classContext.logger.error(error, contextName);
    return error;
  }
}

export class LogHandler implements LoggerHandler {
  constructor(private readonly classContext: LoggerContext) {}

  handle<T>(handleObject: T, context: string): T {
    this.classContext.logger.log(handleObject, context);
    return handleObject;
  }
}
