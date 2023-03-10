import { Document } from 'mongoose';

export interface Repository<T extends Document> {
  create(): Promise<T>;
  deleteById(): Promise<void>;
  getById(): Promise<T>;
}

export const Repository = Symbol('Repository');
