import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { GroupNotExists } from './GroupNotExists.error';

@Catch(GroupNotExists)
export class GroupNotExistsFilter implements ExceptionFilter {
  catch(exception: GroupNotExists, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).set('Content-type', 'application/json').json({
      statusCode: status,
      message: 'Group not exists',
    });
  }
}
