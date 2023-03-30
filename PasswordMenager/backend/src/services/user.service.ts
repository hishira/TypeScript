import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { DTO } from 'src/schemas/dto/object.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { IMeta } from 'src/schemas/Interfaces/meta.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { CreateUserDto } from '../schemas/dto/user.dto';
import { IUser } from '../schemas/Interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly allUserFilterOption: FilterOption<FilterQuery<IUser>> = {
    getOption() {
      return {};
    },
  };
  constructor(
    @Inject('META_MODEL')
    private metamodel: Model<IMeta>,
    @Inject(Repository)
    private readonly userRepository: Repository<IUser>,
  ) {}

  create(userCreateDTO: CreateUserDto): Promise<IUser | { message: string }> {
    const meta = new this.metamodel({});
    return meta.save().then((meta) => {
      const pureDto: DTO = {
        toObject() {
          return {
            ...userCreateDTO,
            meta: meta._id,
          };
        },
      };
      return this.userRepository.create(pureDto).catch((err) => {
        return { message: 'Problem occur while user create' };
      });
    });
  }

  getAll(): Promise<IUser[]> {
    return this.userRepository.find(this.allUserFilterOption);
  }
  getOne(): Promise<IUser[]> {
    return this.userRepository.find(this.allUserFilterOption);
  }
}
