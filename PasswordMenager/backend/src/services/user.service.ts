import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { EditUserDto } from 'src/schemas/dto/edituser.dto';
import { DTO } from 'src/schemas/dto/object.interface';
import { IUser } from '../schemas/Interfaces/user.interface';
import { CreateUserDto } from '../schemas/dto/user.dto';
import { Paginator } from 'src/utils/paginator';

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
  ) {}

  create(userCreateDTO: CreateUserDto): Promise<IUser | { message: string }> {
    const pureDto: DTO = {
      toObject() {
        return {
          ...userCreateDTO,
        };
      },
    };
    return this.userRepository.create(pureDto).catch((err) => {
      return { message: 'Problem occur while user create' };
    });
  }

  getAll(): Promise<IUser[] | { data: IUser[]; pageInfo: Paginator }> {
    return this.userRepository.find(this.allUserFilterOption);
  }

  getOne(): Promise<IUser[] | { data: IUser[]; pageInfo: Paginator }> {
    return this.userRepository.find(this.allUserFilterOption);
  }

  update(userId: string, userEditDto: EditUserDto): Promise<unknown> {
    return this.userRepository.update({
      _id: userId,
      ...userEditDto,
    });
  }
}
