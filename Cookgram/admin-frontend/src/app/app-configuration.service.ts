import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { JWTSetAction } from '../store/jwt/action';
import { MainStore } from '../store/main.store';
import { SessionStorageService } from './shared/services/sessionStorage.service';
import { SessionItemName } from './shared/types/enums';
@Injectable()
export class AppConfigurationService {
  constructor(
    private readonly sessionStorage: SessionStorageService,
    private readonly store: Store<MainStore>
  ) {}

  prepareJwtToken(): void {
    try {
      if (this.sessionStorage.getItem(SessionItemName.Token)) {
        this.saveTokenInStore();
      }
    } catch (_) {}
  }

  private saveTokenInStore(): void {
    this.store.dispatch(
      JWTSetAction({
        ...this.sessionStorage.getItem(SessionItemName.Token),
      })
    );
  }
}
