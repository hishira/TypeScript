import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { NotImplementedError } from 'src/errors/NotImplemented';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { EntryData, IEntry } from 'src/schemas/Interfaces/entry.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { DTO } from 'src/schemas/dto/object.interface';
import { PaginatorDto } from 'src/utils/paginator';
import { UtilsRepository } from './utils.repository';
import { ActiveEntryFilter } from 'src/schemas/utils/activeEntryFilter';
import { EntryBuilder } from 'src/schemas/utils/builders/entry.builder';
import { DeleteEntryUpdate } from 'src/schemas/utils/deleteEntryUpdate.object';

@Injectable()
export class EntryRepository implements Repository<IEntry> {
  constructor(
    @Inject('ENTRY_MODEL')
    private entryModel: Model<IEntry>,
  ) {}

  findById(id: string): Promise<IEntry> {
    return this.entryModel.findOne({ _id: id }).exec();
  }

  createMany(objects: DTO[]): Promise<unknown> {
    const mappedObject = objects.map((obj) => ({ ...obj.toObject() }));
    return this.entryModel
      .insertMany(mappedObject)
      .catch((e) => console.log(e));
  }

  private getEntryData(
    entires: IEntry[],
    paginator: PaginatorDto,
  ): Promise<EntryData> {
    return UtilsRepository.getEntryPaginatorDateAsPromise(entires, paginator);
  }
  find(
    option: FilterOption<FilterQuery<IEntry>>,
    paginator?: PaginatorDto,
  ): Promise<IEntry[] | EntryData | any> {
    if (UtilsRepository.isPaginatorDefined(paginator)) {
      return this.getEntriesWithPaginator(option, paginator);
    }
    return this.returnLimitedEntriesOrAll(option);
  }

  returnLimitedEntriesOrAll(
    option: FilterOption<FilterQuery<IEntry>>,
  ): Promise<IEntry[] | EntryData | any> {
    const ActiveFilter = new ActiveEntryFilter(option).Filter();

    if (UtilsRepository.checkLimitInOptionPossible(option)) {
      return this.entryModel.find(ActiveFilter).limit(option.limit).exec();
    }
    return this.entryModel.find(ActiveFilter).exec();
  }

  getEntriesWithPaginator(
    option: FilterOption<FilterQuery<IEntry>>,
    paginator?: PaginatorDto,
  ): Promise<IEntry[] | EntryData | any> {
    const ActiveFilter = new ActiveEntryFilter(option).Filter();
    console.log(ActiveFilter)
    return this.entryModel
      .find(ActiveFilter)
      .skip(paginator.page * 10)
      .limit(10)
      .exec()
      .then((entires) => this.getEntryData(entires, paginator));
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
      .updateMany(option.getOption(), new DeleteEntryUpdate())
      .exec();
  }

  deleteMany(option: DeleteOption<FilterQuery<IEntry>>): Promise<unknown> {
    return this.entryModel
      .updateMany(option.getOption(), new DeleteEntryUpdate())
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
      .findByIdAndUpdate(id, new DeleteEntryUpdate())
      .exec();
  }

  getById(): Promise<IEntry> {
    throw new NotImplementedError();
  }

  private createEditentity(
    entry: Partial<IEntry>,
    entryById: IEntry,
  ): Partial<IEntry> {
    const data: Partial<IEntry> = { ...entry };
    const editEntryBuilder: EntryBuilder = new EntryBuilder({ ...entryById });
    if (entry.note && entryById.note !== entry.note) {
      editEntryBuilder.entryNoteUpdate(entry.note);
    }
    if (entry.password) {
      editEntryBuilder.entryPasswordUpdate(
        entryById.userid,
        entryById.password,
        data,
      );
    }
    if (entry.title && entryById.title !== entry.title) {
      editEntryBuilder.setTitle(entry.title);
    }
    if (entry.username && entryById.username !== entry.username) {
      editEntryBuilder.setUsername(entry.username);
    }
    if (entry.state && entry.state !== entryById.state) {
      editEntryBuilder.setState(entry.state);
    }
    editEntryBuilder.updateEditDate();
    return editEntryBuilder.getEntry();
  }
}
