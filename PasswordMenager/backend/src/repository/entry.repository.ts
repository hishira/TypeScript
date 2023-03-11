import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { DTO } from 'src/schemas/dto/object.interface';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';

@Injectable()
export class EntryRepository implements Repository<IEntry> {
  constructor(
    @Inject('ENTRY_MODEL')
    private entryModel: Model<IEntry>,
  ) {}

  find(option: FilterOption<FilterQuery<IEntry>>): Promise<IEntry[]> {
    return this.entryModel.find(option.getOption()).exec();
  }

  update(): Promise<unknown> {
    throw new Error('Method not implemented.');
  }

  delete(option: unknown): Promise<void> {
    throw new Error('Method not implemented.');
  }

  create(objectToSave: DTO): Promise<IEntry> {
    const createdEntry = new this.entryModel({
      ...objectToSave.toObject(),
    });
    return createdEntry.save();
  }

  deleteById(): Promise<void> {
    console.log('Hi');
    return new Promise((resolve, reject) => resolve());
  }

  getById(): Promise<IEntry> {
    throw new Error('Method not implemented.');
  }
}
