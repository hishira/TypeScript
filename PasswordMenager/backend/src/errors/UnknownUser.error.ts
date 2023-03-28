import { HttpException } from '@nestjs/common';
const responseObjest = { message: 'Not found user with that creditional' };

export class UnknownUserException extends HttpException {
  constructor(response?: string, status?: number) {
    super(response ?? responseObjest, 200);
  }
}
