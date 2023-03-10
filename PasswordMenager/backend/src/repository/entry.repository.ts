import { Injectable } from '@nestjs/common';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';

@Injectable()
export class EntryRepository implements Repository<IEntry> {
  create(): Promise<IEntry> {
    throw new Error('Method not implemented.');
  }
  deleteById(): Promise<void> {
    console.log('Hi');
    return new Promise((resolve, reject) => resolve());
  }
  getById(): Promise<IEntry> {
    throw new Error('Method not implemented.');
  }
}
