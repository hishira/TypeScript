import { HttpException } from '@nestjs/common';
const DEFAULTSTATUSCODE = 204;
const DEFAULTRESPONSE = 'Not found user';
export class UnknownUserError extends HttpException {
 
  constructor(response?: string, status?: number) {
    super(response ?? DEFAULTRESPONSE, status ?? DEFAULTSTATUSCODE);
  }
}
