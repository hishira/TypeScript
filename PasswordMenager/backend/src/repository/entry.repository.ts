import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { DTO } from 'src/schemas/dto/object.interface';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { LastEditedVariable } from '../schemas/Interfaces/entryMeta.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { NotImplementedError } from 'src/errors/NotImplemented';
import {
  EntrySchemaUtils,
  algorithm,
} from 'src/schemas/utils/Entry.schema.utils';
import { Cipher } from 'src/utils/cipher.utils';

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
      .findById(entry._id)
      .exec()
      .then((entryById) => {
        const data = this.createEditentity(entry, entryById);
        console.log(data);
        return this.entryModel
          .updateOne({ _id: entry._id }, { $set: { ...data } })
          .then((data) => data);
      });
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

  deleteById(id: string): Promise<unknown> {
    return this.entryModel.findByIdAndDelete(id).exec();
  }

  getById(): Promise<IEntry> {
    throw new NotImplementedError();
  }

  private createEditentity(entry: Partial<IEntry>, entryById: IEntry) {
    let data: any = { ...entry };
    if (entry.note && entryById.note !== entry.note) {
      data = {
        ...data,
        ['meta.lastNote']: entryById.note,
        ['meta.lastEditedVariable']: LastEditedVariable.LASTNOTE,
      };
    }
    if (entry.password && entryById.password !== entry.password) {
      console.log(data);
      const bs = EntrySchemaUtils.generateKeyValue(entryById.userid);
      const { password } = data;
      data = {
        ...data,
        password: new Cipher(algorithm, bs, process.env.iv).encryptValue(
          password,
        ),
      };
      data = {
        ...data,
        ['meta.lastPassword']: entryById.password,
        ['meta.lastEditedVariable']: LastEditedVariable.LASTPASSWORD,
      };
    }
    if (entry.title && entryById.title !== entry.title) {
      data = {
        ...data,
        ['meta.lastTitle']: entryById.title,
        ['meta.lastEditedVariable']: LastEditedVariable.LASTTITLE,
      };
    }
    if (entry.username && entryById.username !== entry.username) {
      data = {
        ...data,
        ['meta.lastUsername']: entryById.username,
        ['meta.lastEditedVariable']: LastEditedVariable.LASTUSERNAME,
      };
    }
    return data;
  }
}
