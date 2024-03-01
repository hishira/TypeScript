import { Document } from 'mongoose';
import { PaginatorDto } from 'src/utils/paginator';
import { DTO } from '../dto/object.interface';
import { DeleteOption } from './deleteoption.interface';
import { FilterOption } from './filteroption.interface';

export interface Repository<T extends Document> {
  create(objectToSave: DTO): Promise<T>;
  createMany?(objects: DTO[]): Promise<unknown>;
  find(
    option: FilterOption,
    paginator?: PaginatorPage,
  ): Promise<T[] | PaginatorData<T>>;
  findById(id: string): Promise<T>;
  update(entry: Partial<T>): Promise<T>;
  delete(option: DeleteOption): Promise<unknown>;
  deleteMany?: (option: DeleteOption) => Promise<unknown>;
  getById(): Promise<T>;
}

export const Repository = Symbol('Repository');
