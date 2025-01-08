import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  UnaryFunction,
  catchError,
  filter,
  pipe,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthenticationApiService } from '../../../api/authentication.api';
import { AccessTokeResponse } from '../../../api/types/api.types';
import { JWTSetAccessToken } from '../../../store/jwt/action';
import { MainStore } from '../../../store/main.store';
import { Nullable } from '../types/shared';
import { isNill } from '../utils';
import { ForbiddenRefreshUrlString, RefreshTokenError } from './consts';

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
  readonly UNAUTHORIYECODE = 401;
  private isRefreshing: boolean = false;
  private readonly tokenSubject: BehaviorSubject<Nullable<string>> =
    new BehaviorSubject<Nullable<string>>(null);

  constructor(
    private readonly store: Store<MainStore>,
    private readonly authenticationService: AuthenticationApiService
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((httpError: HttpErrorResponse) => {
        const url = req.url;
        if (ForbiddenRefreshUrlString.some((furl) => url.includes(furl))) {
          throw Error(httpError.message);
        }
        if (httpError.status === this.UNAUTHORIYECODE) {
          return this.handleRefreshing(req, next);
        } else {
          throw Error(httpError.message);
        }
      })
    );
  }

  private addSetToken(
    req: HttpRequest<unknown>,
    token: string
  ): HttpRequest<unknown> {
    this.store.dispatch(JWTSetAccessToken({ accessToken: token }));

    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handleRefreshing(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      return this.refreshToken(req, next);
    } else {
      return this.setTokenFromStore(req, next);
    }
  }

  private refreshToken(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.isRefreshing = true;
    this.tokenSubject.next(null);
    return this.authenticationService
      .refreshToken()
      .pipe(this.handleRefreshToken(req, next));
  }

  private setTokenFromStore(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.tokenSubject.pipe(
      filter((token) => !isNill(token)),
      take(1),
      switchMap((jwt) => {
        return next.handle(this.addSetToken(req, jwt ?? ''));
      })
    );
  }

  private handleRefreshToken(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): UnaryFunction<
    Observable<AccessTokeResponse>,
    Observable<HttpEvent<unknown>>
  > {
    return pipe(
      switchMap((token: AccessTokeResponse) => {
        if ('error' in token) throw RefreshTokenError;

        this.isRefreshing = false;
        this.tokenSubject.next(token.accessToken);
        return next.handle(this.addSetToken(req, token.accessToken));
      }),
      catchError((error) => {
        this.isRefreshing = false;
        return throwError(() => error);
      })
    );
  }
}
