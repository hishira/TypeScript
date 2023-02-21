import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from '../schemas/dto/user.dto';
import { IUser } from '../schemas/Interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<IUser>,
  ) {}

  create(userCreateDTO: CreateUserDto): Promise<IUser | { message: string }> {
    const createdUser = new this.userModel(userCreateDTO);
    return createdUser.save().catch((err) => {
      return { message: 'Problem occur while user create' };
    });
  }

  getAll(): Promise<IUser[]> {
    return this.userModel.find({}).exec();
  }
  getOne(): Promise<IUser[]> {
    return this.userModel.find({}).limit(1).exec();
  }
}
