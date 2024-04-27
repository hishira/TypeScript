import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserErrorMessages } from 'src/errors/errors-messages/userErrorMessages';
import { EventAction } from 'src/schemas/Interfaces/event.interface';
import { IUser } from 'src/schemas/Interfaces/user.interface';
import { UserEventBuilder } from 'src/schemas/utils/builders/event/userEvent.builder';
import { LoggerHandler } from 'src/utils/error.handlers';

export class UserServiceEventLogger {
  constructor(
    private readonly logHandler: LoggerHandler,
    private readonly errorHandler: LoggerHandler,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  userCreate(user: IUser): void {
    this.logHandler.handle(
      `User create id = ${user._id}`,
      UserErrorMessages.Create,
    );

    this.eventEmitter.emitAsync(
      EventAction.Create,
      new UserEventBuilder(user._id, user).setCreateEvent().build(),
    );
  }

  updateUser(user: IUser): void {
    this.logHandler.handle(
      `User id = ${user._id} update sucessfulle`,
      UserErrorMessages.Update,
    );
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new UserEventBuilder(user._id, user).setEditEvent().build(),
    );
  }
}
