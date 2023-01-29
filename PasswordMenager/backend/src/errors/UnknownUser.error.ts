import { HttpException } from '@nestjs/common';
const DEFAULTSTATUSCODE = 204;
const DEFAULTRESPONSE = 'Not found user';
const responseObjest = { message: 'Not found user with that creditional' };

// TODO: Can be better implement with ExceptionFilter
export class UnknownUserException extends HttpException {
  constructor(response?: string, status?: number) {
    super(response ?? DEFAULTRESPONSE, status ?? DEFAULTSTATUSCODE);
  }
}
