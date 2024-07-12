import { Injectable } from '@angular/core';
import { BaseApi } from './base.api';
import { HttpClient } from '@angular/common/http';
import { AccessTokeResponse, LoginPayload, TokenResponse } from './api.types';
import { Store } from '@ngrx/store';
import { Observable, catchError, of, tap, switchMap } from 'rxjs';
import { JWTSetAction } from '../store/jwt/action';
import { MainStore } from '../store/main.store';
import { GetRefreshTokenSelectors } from '../store/jwt/selectors';
import { Router } from '@angular/router';
import { SessionStorageService } from '../app/shared/services/sessionStorage.service';

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

  login(loginPayload: LoginPayload): Observable<TokenResponse | null> {
    return this.httpService
      .post<TokenResponse>(this.prepareLink('auth/login'), loginPayload)
      .pipe(
        tap((loginResponse) => {
          if ('error' in loginResponse) return;
          this.sessionStorage.setItem('token', loginResponse);
          this.store.dispatch(JWTSetAction({ ...loginResponse }));
        }),
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      );
  }

  refreshToken(): Observable<AccessTokeResponse> {
    return this.store.select(GetRefreshTokenSelectors).pipe(
      switchMap((token) => {
        if (token === undefined || token === null) {
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
    this.sessionStorage.removeItems('accessToken', 'tokens', 'refreshToken');
  }
}
