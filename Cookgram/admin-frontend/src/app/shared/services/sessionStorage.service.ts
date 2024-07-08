import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  private readonly session: Storage = sessionStorage;

  getItem<T>(itemName: string): T {
    const item = this.session.getItem(itemName);
    if (item === null)
      throw new Error(`Item ${itemName} not exists in session storage`);
    return JSON.parse(item);
  }

  removeItem(itemName: string): void {
    this.session.removeItem(itemName);
  }

  removeItems(...itemName: string[]): void {
    itemName.forEach((name) => this.session.removeItem(name));
  }

  setItem<T>(itemName: string, item: T): void {
    this.session.setItem(itemName, JSON.stringify(item));
  }

  clearSession(): void {
    this.session.clear();
  }
}
