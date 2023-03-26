import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { DTO } from 'src/schemas/dto/object.interface';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';

@Injectable()
export class EntryRepository implements Repository<IEntry> {
  constructor(
    @Inject('ENTRY_MODEL')
    private entryModel: Model<IEntry>,
  ) {}

  findById(id: string): Promise<IEntry> {
    return this.entryModel.findOne({ _id: id }).exec();
  }

  find(option: FilterOption<FilterQuery<IEntry>>): Promise<IEntry[]> {
    return this.entryModel.find(option.getOption()).exec();
  }

  update(entry: Partial<IEntry>): Promise<unknown> {
    return this.entryModel
      .updateOne({ _id: entry._id }, { $set: { ...entry } })
      .then((data) => data);
  }

  delete(option: DeleteOption<FilterQuery<IEntry>>): Promise<unknown> {
    return this.entryModel.deleteMany(option.getOption()).exec();
  }

  deleteMany(option: DeleteOption<FilterQuery<IEntry>>): Promise<unknown> {
    return this.entryModel.deleteMany(option.getOption()).exec();
  }

  create(objectToSave: DTO): Promise<IEntry> {
    const createdEntry = new this.entryModel({
      ...objectToSave.toObject(),
    });
    return createdEntry.save();
  }

  deleteById(): Promise<void> {
    return new Promise((resolve, reject) => resolve());
  }

  getById(): Promise<IEntry> {
    throw new Error('Method not implemented.');
  }
}
