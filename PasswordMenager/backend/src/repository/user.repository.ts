import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DTO } from 'src/schemas/dto/object.interface';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { IUser } from 'src/schemas/Interfaces/user.interface';

@Injectable()
export class UserRepository implements Repository<IUser> {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<IUser>,
  ) {}
  create(objectToSave: DTO): Promise<IUser> {
    const newUser = new this.userModel({
      ...objectToSave.toObject(),
    });
    return newUser.save();
  }

  find(option: FilterOption<unknown>): Promise<IUser[]> {
    return this.userModel.find(option.getOption()).populate('meta').exec();
  }

  findById(id: string): Promise<IUser> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  update(entry: Partial<IUser>): Promise<unknown> {
    return this.userModel
      .updateOne({ _id: entry._id }, { $set: { ...entry } })
      .then((data) => data);
  }

  delete(option: DeleteOption<unknown>): Promise<unknown> {
    return this.userModel.deleteOne(option.getOption()).exec();
  }

  getById(): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
}
