import { Injectable } from '@angular/core';
import { BaseApi } from './base.api';
import { HttpClient } from '@angular/common/http';
import { LoginPayload, TokenResponse } from './api.types';
import { Store } from '@ngrx/store';
import { Observable, catchError, of, tap } from 'rxjs';
import { JWTSetAction } from '../store/jwt/action';

@Injectable()
export class AuthenticationApiService extends BaseApi {
  constructor(
    private readonly httpService: HttpClient,
    private readonly store: Store
  ) {
    super();
  }

  login(loginPayload: LoginPayload): Observable<TokenResponse | null> {
    return this.httpService
      .post<TokenResponse>(this.prepareLink('testauth/login'), loginPayload)
      .pipe(
        tap((loginResponse) => {
          console.log(loginResponse);
          this.store.dispatch(JWTSetAction({ ...loginResponse }));
        }),
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      );
  }
}
