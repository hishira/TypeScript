import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { NotImplementedError } from 'src/errors/NotImplemented';
import { EntryErrorMessages } from 'src/errors/errors-messages/entryErrorMessages';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { EntryData, IEntry } from 'src/schemas/Interfaces/entry.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { DTO } from 'src/schemas/dto/object.interface';
import { ActiveEntryFilter } from 'src/schemas/utils/activeEntryFilter';
import { EntryBuilder } from 'src/schemas/utils/builders/entry.builder';
import { DeleteEntryUpdate } from 'src/schemas/utils/deleteEntryUpdate.object';
import { Logger } from 'src/utils/Logger';
import { ErrorHandler, LoggerContext } from 'src/utils/error.handlers';
import { PaginatorDto } from 'src/utils/paginator';
import { EntryRepositoryUtils } from './repository-utils/entry-utils';
import { UtilsRepository } from './utils.repository';

@Injectable()
export class EntryRepository implements Repository<IEntry>, LoggerContext {
  errorHandler: ErrorHandler;
  constructor(
    @Inject('ENTRY_MODEL')
    private readonly entryModel: Model<IEntry>,
    readonly logger: Logger,
  ) {
    this.errorHandler = new ErrorHandler(this);
  }

  findById(id: string): Promise<IEntry> {
    return this.entryModel.findOne({ _id: id }).exec();
  }

  createMany(objects: DTO[]): Promise<IEntry[]> {
    // Think of using insertMany -> more specific for many entry insert
    const newEntryObjects =
      EntryRepositoryUtils.GetMappedDtosToProperEntryDto(objects);
    const promises = newEntryObjects.map((t) => this.create(t));
    return Promise.all(promises).catch((error) =>
      this.errorHandler.handle(error, EntryErrorMessages.CreateMany),
    );
  }

  find(
    option: FilterOption<FilterQuery<IEntry>>,
    paginator?: PaginatorDto,
  ): Promise<IEntry[] | EntryData | never> {
    if (UtilsRepository.isPaginatorDefined(paginator)) {
      return this.getEntriesWithPaginator(option, paginator);
    }
    return this.returnLimitedEntriesOrAll(option).then((e) => e ?? []);
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

  update(entry: Partial<IEntry>): Promise<IEntry> {
    return this.entryModel
      .findById(entry._id)
      .then((entryById: IEntry) => this.createEditentity(entry, entryById))
      .then((updatedEntry: Partial<IEntry>) =>
        this.entryModel.findOneAndUpdate(
          { _id: entry._id },
          { $set: { ...updatedEntry } },
          { returnDocument: 'after' },
        ),
      )
      .catch((error) =>
        this.errorHandler.handle(error, EntryErrorMessages.Update),
      );
  }

  delete(option: DeleteOption<FilterQuery<IEntry>>): Promise<unknown> {
    return this.entryModel
      .updateMany(option.getOption(), new DeleteEntryUpdate())
      .exec()
      .catch((error) =>
        this.errorHandler.handle(error, EntryErrorMessages.Delete),
      );
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
    return createdEntry
      .save()
      .catch((error) =>
        this.errorHandler.handle(error, EntryErrorMessages.Create),
      );
  }

  deleteById(id: string): Promise<IEntry> {
    return this.entryModel
      .findByIdAndUpdate(id, new DeleteEntryUpdate())
      .exec()
      .catch((error) =>
        this.errorHandler.handle(error, EntryErrorMessages.DeleteById),
      );
  }

  getById(): Promise<IEntry> {
    throw new NotImplementedError();
  }

  private getEntryData(
    entires: IEntry[],
    paginator: PaginatorDto,
  ): Promise<EntryData> {
    return UtilsRepository.getEntryPaginatorDateAsPromise(entires, paginator);
  }

  private getEntriesWithPaginator(
    option: FilterOption<FilterQuery<IEntry>>,
    paginator?: PaginatorDto,
  ): Promise<IEntry[] | EntryData | any> {
    const ActiveFilter = new ActiveEntryFilter(option).Filter();
    return this.entryModel
      .find(ActiveFilter)
      .skip(paginator.page * 10)
      .limit(10)
      .exec()
      .then((entires) => {
        return this.getEntryData(entires, paginator);
      });
  }
  private removeUnecessaryElementFromEntry(
    entry: Partial<IEntry>,
  ): Partial<IEntry> {
    let updateEntry = { ...entry };
    if ('_doc' in entry) updateEntry = entry._doc as IEntry;
    if ('meta' in updateEntry) {
      const { meta, ...rest } = updateEntry;
      updateEntry = rest;
    }
    return updateEntry;
  }

  private getUpdateInfo(
    entry: Partial<IEntry>,
    updatedEntry: Partial<IEntry>,
  ): UpdateEntryCheck {
    return {
      noteUpdate: entry.note && updatedEntry.note !== entry.note,
      passwordUpdate: entry.password,
      titleUpdate: entry.title && updatedEntry.title !== entry.title,
      userNameUpdate:
        entry.username && updatedEntry.username !== entry.username,
      stateUpdate: entry.state && entry.state !== updatedEntry.state,
    };
  }

  private updateEntryBuilder(
    builder: EntryBuilder,
    entry: Partial<IEntry>,
    updatedEntry: Partial<IEntry>,
    data: Partial<IEntry>,
  ): void {
    const entryUpdateObject = this.getUpdateInfo(entry, updatedEntry);
    if (entryUpdateObject.noteUpdate) {
      builder.entryNoteUpdate(entry.note);
    }
    if (entryUpdateObject.passwordUpdate) {
      builder.entryPasswordUpdate(
        updatedEntry.userid,
        updatedEntry.password,
        data,
      );
    }
    if (entryUpdateObject.titleUpdate) {
      builder.setTitle(entry.title);
    }
    if (entryUpdateObject.userNameUpdate) {
      builder.setUsername(entry.username);
    }
    if (entryUpdateObject.stateUpdate) {
      builder.setState(entry.state);
    }
  }

  private createEditentity(
    entry: Partial<IEntry>,
    entryById: Partial<IEntry>,
  ): Partial<IEntry> {
    const updatedEntry = this.removeUnecessaryElementFromEntry(entryById);
    const data: Partial<IEntry> = { ...entry };
    const editEntryBuilder: EntryBuilder = new EntryBuilder({
      ...updatedEntry,
    });
    this.updateEntryBuilder(editEntryBuilder, entry, updatedEntry, data);
    editEntryBuilder.updateEditDate();
    return editEntryBuilder.getEntry();
  }
}
