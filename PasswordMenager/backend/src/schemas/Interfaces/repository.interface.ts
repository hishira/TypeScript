import { Document } from 'mongoose';
import { DTO } from '../dto/object.interface';
import { DeleteOption } from './deleteoption.interface';
import { FilterOption } from './filteroption.interface';
import { Paginator, PaginatorDto } from 'src/utils/paginator';

export interface Repository<T extends Document> {
  create(objectToSave: DTO): Promise<T>;
  find(
    option: FilterOption,
    paginator?: PaginatorDto,
  ): Promise<T[] | { data: T[]; pageInfo: Paginator }>;
  findById(id: string): Promise<T>;
  update(entry: Partial<T>): Promise<unknown>;
  delete(option: DeleteOption): Promise<unknown>;
  deleteMany?: (option: DeleteOption) => Promise<unknown>;
  getById(): Promise<T>;
}

export const Repository = Symbol('Repository');
