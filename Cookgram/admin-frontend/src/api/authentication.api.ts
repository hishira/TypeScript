import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import { SessionStorageService } from '../app/shared/services/sessionStorage.service';
import { SessionItemName } from '../app/shared/types/enums';
import { Optional } from '../app/shared/types/shared';
import { isNill } from '../app/shared/utils';
import { JWTSetAction } from '../store/jwt/action';
import { GetRefreshTokenSelectors } from '../store/jwt/selectors';
import { MainStore } from '../store/main.store';
import { BaseApi } from './base.api';
import {
  AccessTokeResponse,
  LoginPayload,
  TokenResponse,
} from './types/api.types';

@Injectable()
export class AuthenticationApiService extends BaseApi {
  constructor(
    private readonly httpService: HttpClient,
    private readonly store: Store<MainStore>,
    private readonly router: Router,
    private readonly sessionStorage: SessionStorageService
  ) {
    super();
  }

  login(loginPayload: LoginPayload): Observable<Optional<TokenResponse>> {
    return this.httpService
      .post<TokenResponse>(this.prepareLink('auth/login'), loginPayload)
      .pipe(
        tap((loginResponse) => this.handleTokens(loginResponse)),
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      );
  }

  refreshToken(): Observable<AccessTokeResponse> {
    return this.store.select(GetRefreshTokenSelectors).pipe(
      switchMap((token) => {
        if (isNill(token)) {
          this.router.navigate(['/login']);
        }
        return this.httpService.post<AccessTokeResponse>(
          this.prepareLink('auth/refresh-token'),
          { refreshToken: token }
        );
      })
    );
  }

  removeTokens(): void {
    this.sessionStorage.removeItems(
      SessionItemName.AccessToken,
      SessionItemName.Tokens,
      SessionItemName.RefreshToken
    );
  }

  private handleTokens(loginResponse: TokenResponse): void {
    if ('error' in loginResponse) return;
    this.sessionStorage.setItem(SessionItemName.Token, loginResponse);
    this.store.dispatch(JWTSetAction({ ...loginResponse }));
  }
}
