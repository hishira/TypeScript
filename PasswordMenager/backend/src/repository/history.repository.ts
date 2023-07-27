import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { NotImplementedError } from 'src/errors/NotImplemented';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { IHistory } from 'src/schemas/Interfaces/history.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { DTO } from 'src/schemas/dto/object.interface';
import { PaginatorDto, Paginator } from 'src/utils/paginator';

@Injectable()
export class HistoryRepository implements Repository<IHistory> {
  constructor(
    @Inject('HISTORY_MODEL')
    private readonly historyModel: Model<IHistory>,
  ) {}
  create(objectToSave: DTO): Promise<IHistory> {
    const createHistory = new this.historyModel({
      ...objectToSave.toObject(),
    });

    return createHistory.save();
  }
  find(
    option: FilterOption<unknown>,
    paginator?: PaginatorDto,
  ): Promise<IHistory[] | { data: IHistory[]; pageInfo: Paginator }> {
    throw new NotImplementedError();
  }
  findById(id: string): Promise<IHistory> {
    throw new NotImplementedError();
  }
  update(entry: Partial<IHistory>): Promise<unknown> {
    // TODO: Fix for group add
    if (entry.entities && entry.entities.length > 0) {
      return this.historyModel
        .updateOne(
          { userid: entry.userid },
          { $push: { entities: entry.entities } },
        )
        .exec();
    }
    // TODO: Check groups add
    if (entry.groups && entry.groups.length > 0) {
      return this.historyModel
        .updateOne(
          { userid: entry.userid },
          { $push: { groups: entry.groups } },
        )
        .exec();
    }
  }
  delete(option: DeleteOption<unknown>): Promise<unknown> {
    throw new NotImplementedError();
  }
  deleteMany?: (option: DeleteOption<unknown>) => Promise<unknown>;
  getById(): Promise<IHistory> {
    throw new NotImplementedError();
  }
}
