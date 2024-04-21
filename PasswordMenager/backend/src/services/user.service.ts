import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateEventCommand } from 'src/commands/event/CreateEventCommand';
import { CreateHistoryCommand } from 'src/commands/history/CreateHistoryCommand';
import { CreateUserCommand } from 'src/commands/user/CreateUserCommand';
import { UpdateUserCommand } from 'src/commands/user/UpdateUserCommand';
import { CreateUserEvent } from 'src/events/createUserEvent';
import { EventTypes } from 'src/events/eventTypes';
import { GetAllUserQuery } from 'src/queries/user/getAllUser.queries';
import { GetFilteredUserQueries } from 'src/queries/user/getFilteredUser.queries';
import { ErrorUserCreateResponse } from 'src/response/userErrorCreate.response';
import { EventType } from 'src/schemas/Interfaces/event.interface';
import { IHistory } from 'src/schemas/Interfaces/history.interface';
import { EditUserDto } from 'src/schemas/dto/edituser.dto';
import { Logger } from 'src/utils/Logger';
import {
  ErrorHandler,
  LogHandler,
  LoggerContext,
  LoggerHandler,
} from 'src/utils/error.handlers';
import { Paginator } from 'src/utils/paginator';
import { IUser } from '../schemas/Interfaces/user.interface';
import { CreateUserDto } from '../schemas/dto/user.dto';

@Injectable()
export class UserService implements LoggerContext {
  logHandler: LoggerHandler = new LogHandler(this);
  errorHandler: LoggerHandler = new ErrorHandler(this);
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    readonly logger: Logger,
  ) {}

  @OnEvent(EventTypes.CreateUser, { async: true })
  createUserEvent(createUserEvent: CreateUserEvent): Promise<unknown> {
    return this.create(createUserEvent.createUserDto);
  }

  create(
    userCreateDTO: CreateUserDto,
  ): Promise<IUser | { message: string } | IHistory> {
    return this.commandBus
      .execute(new CreateUserCommand(userCreateDTO))
      .then((user) => this.createHistoryForUser(user))
      .then((user) => this.createEvent(user))
      .then((_) => _)
      .catch((err) => ErrorUserCreateResponse);
  }

  getAll(): Promise<IUser[] | { data: IUser[]; pageInfo: Paginator }> {
    return this.queryBus.execute(new GetAllUserQuery());
  }

  getOne(): Promise<IUser[] | { data: IUser[]; pageInfo: Paginator }> {
    return this.queryBus.execute(new GetAllUserQuery());
  }

  getUser(userid: string): Promise<IUser> {
    return this.queryBus
      .execute(new GetFilteredUserQueries({ userid: userid }))
      .then((r) => {
        return r ?? {};
      });
  }

  update(userId: string, userEditDto: EditUserDto): Promise<IUser> {
    return this.commandBus.execute(new UpdateUserCommand(userId, userEditDto));
  }

  private createHistoryForUser(user: IUser): IUser {
    this.commandBus.execute(new CreateHistoryCommand(user._id));
    this.logger.log(`User create id = ${user._id}`);
    return user;
  }
  private createEvent(user: IUser): Promise<IUser> {
    return this.commandBus
      .execute(
        new CreateEventCommand({
          eventType: EventType.Create,
          relatedEnittyId: 'test',
        }),
      )
      .then((_) => this.logger.log('Create event created'))
      .then((_) => user);
  }
}
