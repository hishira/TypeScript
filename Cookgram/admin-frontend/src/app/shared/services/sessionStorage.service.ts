import { Injectable } from '@angular/core';
import { SessionItemName } from '../types/enums';
import { StorageItem } from '../types/shared';
import { isNill } from '../utils';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  private readonly session: Storage = sessionStorage;

  getItem<T>(itemName: SessionItemName): T {
    const item = this.session.getItem(itemName);
    if (isNill(item))
      throw new Error(`Item ${itemName} not exists in session storage`);

    return JSON.parse(item);
  }

  removeItem(itemName: SessionItemName): void {
    this.session.removeItem(itemName);
  }

  removeItems(...itemName: SessionItemName[]): void {
    itemName.forEach((name) => this.session.removeItem(name));
  }

  setItem<T>(itemName: SessionItemName, item: T): void {
    this.session.setItem(itemName, JSON.stringify(item));
  }

  setItems(items: StorageItem<unknown>[]): void {
    items.forEach(({ itemName, item }) =>
      this.session.setItem(itemName, JSON.stringify(item))
    );
  }

  clearSession(): void {
    this.session.clear();
  }
}
