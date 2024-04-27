import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { CreateHistoryCommand } from 'src/commands/history/CreateHistoryCommand';
import { CreateUserCommand } from 'src/commands/user/CreateUserCommand';
import { UpdateUserCommand } from 'src/commands/user/UpdateUserCommand';
import { CreateUserEvent } from 'src/events/createUserEvent';
import { EventTypes } from 'src/events/eventTypes';
import { GetAllUserQuery } from 'src/queries/user/getAllUser.queries';
import { GetFilteredUserQueries } from 'src/queries/user/getFilteredUser.queries';
import { ErrorUserCreateResponse } from 'src/response/userErrorCreate.response';
import { IHistory } from 'src/schemas/Interfaces/history.interface';
import { EditUserDto } from 'src/schemas/dto/edituser.dto';
import { Logger } from 'src/utils/Logger';
import {
  ErrorHandler,
  LogHandler,
  LoggerContext,
} from 'src/utils/error.handlers';
import { Paginator } from 'src/utils/paginator';
import { IUser } from '../schemas/Interfaces/user.interface';
import { CreateUserDto } from '../schemas/dto/user.dto';
import { UserServiceEventLogger } from './eventAndLog/userServiceEventLogger';

@Injectable()
export class UserService implements LoggerContext {
  private userServiceEventLogger: UserServiceEventLogger;
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.userServiceEventLogger = new UserServiceEventLogger(
      new LogHandler(this),
      new ErrorHandler(this),
      this.eventEmitter,
    );
  }

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
      .then((user) => this.createCreateEvent(user))
      .then((_) => _)
      .catch((_) => ErrorUserCreateResponse);
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
    return this.commandBus
      .execute(new UpdateUserCommand(userId, userEditDto))
      .then((user) => this.createUpdateEvent(user));
  }

  private createHistoryForUser(user: IUser): IUser {
    this.commandBus.execute(new CreateHistoryCommand(user._id));

    return user;
  }

  private createCreateEvent(user: IUser): Promise<IUser> {
    this.userServiceEventLogger.userCreate(user);

    return Promise.resolve(user);
  }

  private createUpdateEvent(user: IUser): Promise<IUser> {
    this.userServiceEventLogger.updateUser(user);

    return Promise.resolve(user);
  }
}
