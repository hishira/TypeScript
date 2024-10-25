import { Injectable } from '@angular/core';
import { StorageItem } from '../types/shared';
export enum SessionItemName {
  Token = 'token',
  Tokens  = 'tokens',
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken',

}
@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  private readonly session: Storage = sessionStorage;

  getItem<T>(itemName: SessionItemName): T {
    const item = this.session.getItem(itemName);
    if (item === null)
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

  setItems(items: StorageItem<any>[]): void {
    items.forEach(({ itemName, item }) =>
      this.session.setItem(itemName, JSON.stringify(item))
    );
  }

  clearSession(): void {
    this.session.clear();
  }
}
