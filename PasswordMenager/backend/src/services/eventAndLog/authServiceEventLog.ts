import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventAction } from 'src/schemas/Interfaces/event.interface';
import { AuthInfo } from 'src/schemas/dto/auth.dto';
import { CreateUserDto } from 'src/schemas/dto/user.dto';
import { UserEventBuilder } from 'src/schemas/utils/builders/event/userEvent.builder';
import { LoggerHandler } from 'src/utils/error.handlers';
import { AuthError } from 'src/errors/errors-messages/authenticationErrorMessages';
import { EventTypes } from 'src/events/eventTypes';
import { CreateUserEvent } from 'src/events/createUserEvent';

export class AuthServiceEventLog {
  constructor(
    private readonly logHandler: LoggerHandler,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  emitPromiseCreateUserEvent(user: CreateUserDto): Promise<CreateUserDto> {
    this.logHandler.handle(
      AuthError.CreateUserEventEmit,
      AuthError.CreateUserContext,
    );
    return Promise.resolve(() => {
      return true;
    }).then((_) => {
      this.eventEmitter.emitAsync(
        EventTypes.CreateUser,
        new CreateUserEvent(user),
      );
      return user;
    });
  }

  userNotExistsDebug(): void {
    this.logHandler.handle(
      AuthError.ValidateUserNotExists,
      AuthError.ValidateUserNotExistsContext,
    );
  }

  createLoginEventAndDebug(userinfo: AuthInfo): void {
    this.logHandler.handle(
      AuthError.ValidateUserNotExistsWrongPassword,
      AuthError.ValidateUserNotExistsContext,
    );
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new UserEventBuilder(null, userinfo).setLoginEvent().build(),
    );
  }

  userLoginEvent(userinfo: AuthInfo): void {
    this.logHandler.handle(
      AuthError.UserLogin + ` ${userinfo.login}`,
      AuthError.ValidateUserNotExistsContext,
    );

    this.eventEmitter.emitAsync(
      EventAction.Create,
      new UserEventBuilder(null, userinfo).setLoginEvent().build(),
    );
  }
}
