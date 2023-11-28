import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { NotImplementedError } from 'src/errors/NotImplemented';
import { DTO } from 'src/schemas/dto/object.interface';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { GroupBuilder, IGroup } from 'src/schemas/Interfaces/group.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';

@Injectable()
export class GroupRepository implements Repository<IGroup> {
  constructor(
    @Inject('GROUP_MODEL')
    private readonly groupModel: Model<IGroup>,
  ) {}

  create(objectToSave: DTO): Promise<IGroup> {
    const createdGroup = new this.groupModel({
      ...objectToSave.toObject(),
    });

    return createdGroup.save();
  }

  find(option: FilterOption<unknown>): Promise<IGroup[]> {
    return this.groupModel.find(option.getOption()).exec();
  }

  findById(id: string): Promise<IGroup> {
    return this.groupModel.findOne({ _id: id }).exec();
  }

  update(entry: Partial<IGroup>): Promise<unknown> {
    return this.groupModel
      .findById(entry._id)
      .exec()
      .then((group) => {
        return this.groupModel
          .updateOne(
            { _id: entry._id },
            new GroupBuilder(entry)
              .metaLastNameUpdate(group.name)
              .getUpdateSetObject(),
          )
          .then((data) => data);
      });
  }

  delete(option: DeleteOption<unknown>): Promise<unknown> {
    return this.groupModel.deleteOne(option.getOption()).exec();
  }

  getById(): Promise<IGroup> {
    throw new NotImplementedError();
  }
}
