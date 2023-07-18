import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { DTO } from 'src/schemas/dto/object.interface';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import {
  EntryData,
  EntryState,
  IEntry,
} from 'src/schemas/Interfaces/entry.interface';
import { LastEditedVariable } from '../schemas/Interfaces/entryMeta.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { NotImplementedError } from 'src/errors/NotImplemented';
import {
  EntrySchemaUtils,
  algorithm,
} from 'src/schemas/utils/Entry.schema.utils';
import { Cipher } from 'src/utils/cipher.utils';
import { Paginator, PaginatorDto } from 'src/utils/paginator';

@Injectable()
export class EntryRepository implements Repository<IEntry> {
  constructor(
    @Inject('ENTRY_MODEL')
    private entryModel: Model<IEntry>,
  ) {}

  findById(id: string): Promise<IEntry> {
    return this.entryModel.findOne({ _id: id }).exec();
  }

  // TODO: To other component, seperate
  private isPaginatorDefined(paginator?: PaginatorDto): boolean {
    return (
      paginator &&
      'page' in paginator &&
      paginator?.page !== undefined &&
      paginator?.page !== null
    );
  }

  private getEntryData(
    entires: IEntry[],
    paginator: PaginatorDto,
  ): Promise<EntryData> {
    return Promise.resolve({
      data: entires,
      pageInfo: new Paginator(
        entires.length,
        entires.length >= 10,
        paginator.page,
      ),
    });
  }
  find(
    option: FilterOption<FilterQuery<IEntry>>,
    paginator?: PaginatorDto,
  ): Promise<IEntry[] | EntryData | any> {
    const ActiveFilter: FilterQuery<IEntry> = {
      ...option.getOption(),
      state: EntryState.ACTIVE,
    };
    if (this.isPaginatorDefined(paginator)) {
      return this.entryModel
        .find(ActiveFilter)
        .skip(paginator.page * 10)
        .limit(10)
        .exec()
        .then((entires) => this.getEntryData(entires, paginator));
    }
    return this.entryModel.find(ActiveFilter).exec();
  }

  update(entry: Partial<IEntry>): Promise<unknown> {
    return this.entryModel
      .findById(entry._id)
      .exec()
      .then((entryById) => {
        const data = this.createEditentity(entry, entryById);
        return this.entryModel
          .updateOne({ _id: entry._id }, { $set: { ...data } })
          .then((data) => data);
      });
  }

  delete(option: DeleteOption<FilterQuery<IEntry>>): Promise<unknown> {
    return this.entryModel
      .updateMany(option.getOption(), { $set: { state: EntryState.DELETED } })
      .exec();
  }

  deleteMany(option: DeleteOption<FilterQuery<IEntry>>): Promise<unknown> {
    return this.entryModel
      .updateMany(option.getOption(), { $set: { state: EntryState.DELETED } })
      .exec();
  }

  create(objectToSave: DTO): Promise<IEntry> {
    const createdEntry = new this.entryModel({
      ...objectToSave.toObject(),
    });
    return createdEntry.save();
  }

  deleteById(id: string): Promise<unknown> {
    return this.entryModel
      .findByIdAndUpdate(id, {
        $set: { state: EntryState.DELETED },
      })
      .exec();
  }

  getById(): Promise<IEntry> {
    throw new NotImplementedError();
  }

  private createEditentity(entry: Partial<IEntry>, entryById: IEntry) {
    // TODO: Refactor
    let data: any = { ...entry };
    if (entry.note && entryById.note !== entry.note) {
      data = {
        ...data,
        ['meta.lastNote']: entryById.note,
        ['meta.lastEditedVariable']: LastEditedVariable.LASTNOTE,
      };
    }
    if (entry.password) {
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
    data = {
      ...data,
      ['meta.editDate']: new Date(),
    };
    return data;
  }
}
