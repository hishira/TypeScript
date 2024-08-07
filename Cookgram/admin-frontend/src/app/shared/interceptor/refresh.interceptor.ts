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
  catchError,
  filter,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { JWTSetAccessToken } from '../../../store/jwt/action';
import { MainStore } from '../../../store/main.store';
import { AuthenticationApiService } from '../../../api/authentication.api';

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
  readonly UNAUTHORIYECODE = 401;
  private isRefreshing: boolean = false;
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  constructor(
    private readonly store: Store<MainStore>,
    private readonly authenticationService: AuthenticationApiService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((httpError: HttpErrorResponse) => {
        if (
          httpError.status === this.UNAUTHORIYECODE &&
          !req.url.includes('refresh-token')
        ) {
          return this.handleRefreshing(req, next);
        } else {
          throw Error(httpError.message);
        }
      })
    );
  }

  private addSetToken(req: HttpRequest<any>, token: string) {
    this.store.dispatch(JWTSetAccessToken({ accessToken: token }));
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  private handleRefreshing(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.tokenSubject.next(null);
      return this.authenticationService.refreshToken().pipe(
        switchMap((token) => {
          if ('error' in token) throw new Error('Cannot refresh token');

          this.isRefreshing = false;
          this.tokenSubject.next(token.accessToken);
          return next.handle(this.addSetToken(req, token.accessToken));
        }),
        catchError((error) => {
          this.isRefreshing = false;
          return throwError(() => error);
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addSetToken(req, jwt ?? ''));
        })
      );
    }
  }
}
