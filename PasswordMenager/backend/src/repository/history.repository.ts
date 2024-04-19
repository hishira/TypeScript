import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { NotImplementedError } from 'src/errors/NotImplemented';
import { HistoryErrorMapper } from 'src/errors/errors-messages/historyErrorMessages';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { IHistory } from 'src/schemas/Interfaces/history.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { DTO } from 'src/schemas/dto/object.interface';
import { HistoryBuilder } from 'src/schemas/utils/builders/history.builder';
import { Logger } from 'src/utils/Logger';
import { ErrorHandler, LoggerContext } from 'src/utils/error.handlers';
import { Paginator, PaginatorDto } from 'src/utils/paginator';

@Injectable()
export class HistoryRepository implements Repository<IHistory>, LoggerContext {
  errorHandler: ErrorHandler;
  constructor(
    @Inject('HISTORY_MODEL')
    private readonly historyModel: Model<IHistory>,
    readonly logger: Logger,
  ) {
    this.errorHandler = new ErrorHandler(this);
  }

  create(objectToSave: DTO): Promise<IHistory> {
    const createHistory = new this.historyModel({
      ...objectToSave.toObject(),
    });

    return createHistory
      .save()
      .catch((e) => this.errorHandler.handle(e, HistoryErrorMapper.Create));
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

  update(entry: Partial<IHistory>): Promise<IHistory> {
    return Promise.resolve(entry)
      .then((historyEntry) =>
        new HistoryBuilder().updateBaseOnIHistory(historyEntry).getPushObject(),
      )
      .then((historyPushObject) =>
        this.historyModel.findOneAndUpdate(
          { userid: entry.userid },
          historyPushObject,
          { returnDocument: 'after' },
        ),
      )
      .catch((error) =>
        this.errorHandler.handle(error, HistoryErrorMapper.Update),
      );
  }

  delete(option: DeleteOption<unknown>): Promise<unknown> {
    throw new NotImplementedError();
  }

  deleteMany?: (option: DeleteOption<unknown>) => Promise<unknown>;

  getById(): Promise<IHistory> {
    throw new NotImplementedError();
  }
}
