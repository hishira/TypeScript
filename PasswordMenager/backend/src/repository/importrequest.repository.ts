import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { ImportRequest } from 'src/schemas/Interfaces/importRequest.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { DTO } from 'src/schemas/dto/object.interface';
import { PaginatorDto, Paginator } from 'src/utils/paginator';

@Injectable()
export class ImportRequestRepository implements Repository<ImportRequest> {
  constructor(
    @Inject('IMPORT_REQUEST_MODEL')
    private readonly importRequestModal: Model<ImportRequest>,
  ) {}
  create(objectToSave: DTO): Promise<ImportRequest> {
    const createdImportRequest = new this.importRequestModal({
      ...objectToSave.toObject(),
    });

    return createdImportRequest.save();
  }
  find(
    option: FilterOption<unknown>,
    paginator?: PaginatorDto,
  ): Promise<ImportRequest[] | { data: ImportRequest[]; pageInfo: Paginator }> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<ImportRequest> {
    throw new Error('Method not implemented.');
  }
  update(entry: Partial<ImportRequest>): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  delete(option: DeleteOption<unknown>): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  deleteMany?: (option: DeleteOption<unknown>) => Promise<unknown>;
  getById(): Promise<ImportRequest> {
    throw new Error('Method not implemented.');
  }
}