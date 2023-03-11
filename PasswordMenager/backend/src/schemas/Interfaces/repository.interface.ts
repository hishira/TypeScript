import { Document } from 'mongoose';
import { DTO } from '../dto/object.interface';

export interface Repository<T extends Document> {
  create(objectToSave: DTO): Promise<T>;
  deleteById(): Promise<void>;
  getById(): Promise<T>;
}

export const Repository = Symbol('Repository');
