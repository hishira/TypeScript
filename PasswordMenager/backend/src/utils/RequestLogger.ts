import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLogger implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url, baseUrl } = request;
    let startTime;
    let endTime;
    request.on('close', () => {
      this.logger.log(`${method} ${baseUrl + url} - START`);
      startTime = new Date().getMilliseconds();
    });
    response.on('finish', () => {
      const { statusCode } = response;
      endTime = new Date().getMilliseconds();
      this.logger.log(
        `${method} ${baseUrl + url} ${statusCode} - END TIME ${
          endTime - startTime
        }ms`,
      );
    });

    next();
  }
}
