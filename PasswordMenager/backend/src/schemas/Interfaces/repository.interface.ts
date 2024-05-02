import { Document } from 'mongoose';
import { DTO } from '../dto/object.interface';
import { DeleteOption } from './deleteoption.interface';
import { FilterOption } from './filteroption.interface';
import { BaseError } from 'src/errors/bace-error';

export interface Repository<T extends Document> {
  create(objectToSave: DTO): Promise<T | BaseError>;
  createMany?(objects: DTO[]): Promise<T[] | BaseError>;
  find(
    option: FilterOption,
    paginator?: PaginatorPage,
  ): Promise<T[] | PaginatorData<T> | BaseError>;
  findById(id: string): Promise<T | BaseError>;
  update(entry: Partial<T>): Promise<T | BaseError>;
  delete(option: DeleteOption): Promise<T | BaseError>;
  deleteMany?: (option: DeleteOption) => Promise<T | BaseError>;
  getById(): Promise<T | BaseError>;
}

export const Repository = Symbol('Repository');
