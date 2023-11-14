import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/commands/user/CreateUserCommand';
import { UpdateUserCommand } from 'src/commands/user/UpdateUserCommand';
import { GetAllUserQuery } from 'src/queries/user/getAllUser.queries';
import { GetFilteredUserQueries } from 'src/queries/user/getFilteredUser.queries';
import { IHistory } from 'src/schemas/Interfaces/history.interface';
import { EditUserDto } from 'src/schemas/dto/edituser.dto';
import { Paginator } from 'src/utils/paginator';
import {
  ErrorUserCreateResponse,
  IUser,
} from '../schemas/Interfaces/user.interface';
import { CreateUserDto } from '../schemas/dto/user.dto';
import { HistoryService } from './history.service';
@Injectable()
export class UserService {
  constructor(
    private readonly history: HistoryService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(
    userCreateDTO: CreateUserDto,
  ): Promise<IUser | { message: string } | IHistory> {
    return this.commandBus
      .execute(
        new CreateUserCommand(
          userCreateDTO.login,
          userCreateDTO.password,
          userCreateDTO.email,
        ),
      )
      .then((user) => {
        return this.history.create(user._id);
      })
      .catch((err) => {
        console.log(err);
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
    return this.queryBus.execute(new GetFilteredUserQueries(userid));
  }

  update(userId: string, userEditDto: EditUserDto): Promise<unknown> {
    return this.commandBus.execute(new UpdateUserCommand(userId, userEditDto));
  }
}
