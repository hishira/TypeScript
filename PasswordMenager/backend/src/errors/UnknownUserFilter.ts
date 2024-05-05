import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { UnknownUserException } from './UnknownUser.error';

@Catch(UnknownUserException)
export class UnknownUserExceptionFilter implements ExceptionFilter {
  catch(exception: UnknownUserException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    response.status(status).set('Content-Type', 'application/json').json({
      statusCode: status,
      message: 'User not exists',
    });
  }
}
