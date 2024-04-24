import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateUserDto } from 'src/schemas/dto/user.dto';
import { LoggerHandler } from 'src/utils/error.handlers';

export class AuthServiceEventLog {
  constructor(
    private readonly logHandler: LoggerHandler,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  emitCreateUser(user: CreateUserDto): void {}
  userNotExistsDebug(): void {}
  createLoginEventAndDebug(): void {}
}
