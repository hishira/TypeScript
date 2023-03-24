import { HttpException } from '@nestjs/common';
const responseObject = { message: 'Group with that id not exists' };
export class GroupNotExists extends HttpException {
  constructor(response?: string, status?: number) {
    super(response ?? responseObject, status ?? 400);
  }
}
