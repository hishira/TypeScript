import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { OnEvent } from '@nestjs/event-emitter';
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
import { Paginator } from 'src/utils/paginator';
import { IUser } from '../schemas/Interfaces/user.interface';
import { CreateUserDto } from '../schemas/dto/user.dto';
@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @OnEvent(EventTypes.CreateUser, { async: true })
  createUserEvent(createUserEvent: CreateUserEvent) {
    return this.create(createUserEvent.createUserDto);
  }

  create(
    userCreateDTO: CreateUserDto,
  ): Promise<IUser | { message: string } | IHistory> {
    return this.commandBus
      .execute(new CreateUserCommand(userCreateDTO))
      .then((user) => {
        return this.commandBus.execute(new CreateHistoryCommand(user._id));
      })
      .catch((err) => {
        return ErrorUserCreateResponse;
      });
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

  update(userId: string, userEditDto: EditUserDto): Promise<unknown> {
    return this.commandBus.execute(new UpdateUserCommand(userId, userEditDto));
  }
}
