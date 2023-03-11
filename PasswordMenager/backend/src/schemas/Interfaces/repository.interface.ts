import { Document } from 'mongoose';
import { DTO } from '../dto/object.interface';
import { FilterOption } from './filteroption.interface';

export interface Repository<T extends Document> {
  create(objectToSave: DTO): Promise<T>;
  find(option: FilterOption): Promise<T[]>;
  update(): Promise<unknown>;
  delete(option: unknown): Promise<void>;
  getById(): Promise<T>;
}

export const Repository = Symbol('Repository');
