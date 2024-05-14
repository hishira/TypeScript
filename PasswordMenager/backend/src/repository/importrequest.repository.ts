import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { BaseError } from 'src/errors/bace-error';
import { ImportRequestErrorMessages } from 'src/errors/errors-messages/importRequestErrorMessages';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { ImportRequest } from 'src/schemas/Interfaces/importRequest.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { DTO } from 'src/schemas/dto/object.interface';
import { Logger } from 'src/utils/Logger';
import { ErrorHandler, LoggerContext } from 'src/utils/error.handlers';
import { Paginator, PaginatorDto } from 'src/utils/paginator';

@Injectable()
export class ImportRequestRepository
  implements Repository<ImportRequest>, LoggerContext
{
  errorHandler = new ErrorHandler(this);

  constructor(
    @Inject('IMPORT_REQUEST_MODEL')
    private readonly importRequestModal: Model<ImportRequest>,
    readonly logger: Logger,
  ) {}

  create(objectToSave: DTO): Promise<ImportRequest> {
    const createdImportRequest = new this.importRequestModal({
      ...objectToSave.toObject(),
    });

    return createdImportRequest
      .save()
      .catch((error) =>
        this.errorHandler.handle(error, ImportRequestErrorMessages.Create),
      );
  }

  find(
    option: FilterOption<FilterQuery<ImportRequest>>,
    paginator?: PaginatorDto,
  ): Promise<ImportRequest[] | { data: ImportRequest[]; pageInfo: Paginator }> {
    if ('_id' in option.getOption())
      return this.findById(option.getOption()._id).then((resp) => [resp]);
    return Promise.resolve(
      this.importRequestModal.find({ ...option.getOption() }),
    ).catch((error) =>
      this.errorHandler.handle(error, ImportRequestErrorMessages.Find),
    );
  }

  findById(id: string): Promise<ImportRequest> {
    return this.importRequestModal
      .findById(id)
      .exec()
      .catch((error) =>
        this.errorHandler.handle(error, ImportRequestErrorMessages.FindById),
      );
  }

  update(entry: Partial<ImportRequest>): Promise<ImportRequest> {
    return Promise.resolve(entry)
      .then((updatedEntry) =>
        this.importRequestModal.findOneAndUpdate(
          { _id: entry.id },
          { $set: { ...entry } },
          { returnDocument: 'after' },
        ),
      )
      .catch((error) =>
        this.errorHandler.handle(error, ImportRequestErrorMessages.Update),
      );
  }

  delete(
    option: DeleteOption<Partial<ImportRequest>>,
  ): Promise<ImportRequest | BaseError> {
    const optionValue = option.getOption();
    return this.importRequestModal
      .findOneAndUpdate({ _id: optionValue._id }, { $set: { ...optionValue } })
      .exec()
      .catch((error) =>
        this.errorHandler.handle(error, ImportRequestErrorMessages.Delete),
      );
  }

  deleteMany?: (
    option: DeleteOption<unknown>,
  ) => Promise<ImportRequest | BaseError>;

  getById(): Promise<ImportRequest> {
    throw new Error('Method not implemented.');
  }
}
