import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { EditUserDto } from 'src/schemas/dto/edituser.dto';
import { DTO } from 'src/schemas/dto/object.interface';
import { IUser } from '../schemas/Interfaces/user.interface';
import { CreateUserDto } from '../schemas/dto/user.dto';
import { Paginator } from 'src/utils/paginator';
import { HistoryService } from './history.service';
import { IHistory } from 'src/schemas/Interfaces/history.interface';

@Injectable()
export class UserService {
  private readonly allUserFilterOption: FilterOption<FilterQuery<IUser>> = {
    getOption() {
      return {};
    },
  };
  constructor(
    @Inject(Repository)
    private readonly userRepository: Repository<IUser>,
    private readonly history: HistoryService,
  ) {}

  create(
    userCreateDTO: CreateUserDto,
  ): Promise<IUser | { message: string } | IHistory> {
    const pureDto: DTO = {
      toObject() {
        return {
          ...userCreateDTO,
        };
      },
    };
    return this.userRepository
      .create(pureDto)
      .then((user) => {
        return this.history.create(user._id);
      })
      .catch((err) => {
        return { message: 'Problem occur while user create' };
      });
  }

  getAll(): Promise<IUser[] | { data: IUser[]; pageInfo: Paginator }> {
    return this.userRepository.find(this.allUserFilterOption);
  }

  getOne(): Promise<IUser[] | { data: IUser[]; pageInfo: Paginator }> {
    return this.userRepository.find(this.allUserFilterOption);
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
