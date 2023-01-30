import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpVersionNotSupportedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { UnknownUserException } from './UnknownUser.error';

@Catch(UnknownUserException)
export class UnknownUserExceptionFilter implements ExceptionFilter {
  catch(exception: UnknownUserException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    console.log('HttpVersionNotSupportedException: Log', status);
    response.status(status).set("Content-Type","application/json").json({
      statusCode: status,
      message: 'User not exists with that credintional',
      andOther: '123',
    });
  }
}
