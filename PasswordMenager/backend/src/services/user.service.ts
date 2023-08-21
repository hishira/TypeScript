import { Inject, Injectable } from '@nestjs/common';
import { IHistory } from 'src/schemas/Interfaces/history.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { EditUserDto } from 'src/schemas/dto/edituser.dto';
import { DTO } from 'src/schemas/dto/object.interface';
import { Paginator } from 'src/utils/paginator';
import {
  ErrorUserCreateResponse,
  IUser,
  UserDTOMapper,
  UserUtils,
} from '../schemas/Interfaces/user.interface';
import { CreateUserDto } from '../schemas/dto/user.dto';
import { HistoryService } from './history.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(Repository)
    private readonly userRepository: Repository<IUser>,
    private readonly history: HistoryService,
  ) {}

  create(
    userCreateDTO: CreateUserDto,
  ): Promise<IUser | { message: string } | IHistory> {
    return this.userRepository
      .create(UserDTOMapper.GetDTOFromCreateUserDTO(userCreateDTO))
      .then((user) => {
        return this.history.create(user._id);
      })
      .catch((err) => {
        return ErrorUserCreateResponse;
      });
  }

  getAll(): Promise<IUser[] | { data: IUser[]; pageInfo: Paginator }> {
    return this.userRepository.find(UserUtils.allUserFilterOption);
  }

  getOne(): Promise<IUser[] | { data: IUser[]; pageInfo: Paginator }> {
    return this.userRepository.find(UserUtils.allUserFilterOption);
  }

  getUser(userid: string): Promise<IUser> {
    return this.userRepository.findById(userid);
  }

  update(userId: string, userEditDto: EditUserDto): Promise<unknown> {
    return this.userRepository.update({
      _id: userId,
      ...userEditDto,
    });
  }
}
