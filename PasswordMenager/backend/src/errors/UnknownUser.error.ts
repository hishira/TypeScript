import { HttpException } from '@nestjs/common';
const DEFAULTSTATUSCODE = 204;
const DEFAULTRESPONSE = 'Not found user';
const responseObjest = { message: 'Not found user with that creditional' };

export class UnknownUserException extends HttpException {
  constructor(response?: string, status?: number) {
    super(response ?? responseObjest, 200);
  }
}
