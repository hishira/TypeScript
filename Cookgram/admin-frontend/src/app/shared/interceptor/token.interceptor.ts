import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';
import { GetAccessTokenSelectors } from '../../../store/jwt/selectors';
import { MainStore } from '../../../store/main.store';
import { BarearTokenString } from './consts';
enum UrlForNotRefresh {
  Login = 'login',
  RefreshToken = 'refresh-token',
}
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  static readonly urlNotForRefreshToken: readonly string[] = [
    UrlForNotRefresh.Login,
    UrlForNotRefresh.RefreshToken,
  ];

  constructor(private readonly store: Store<MainStore>) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const url = req.url;
    if (
      TokenInterceptor.urlNotForRefreshToken.some((furl) => url.includes(furl))
    ) {
      return next.handle(req.clone());
    }

    return this.getAccessTokenAndSetToRequest(req, next);
  }

  private getAccessTokenAndSetToRequest(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.store.select(GetAccessTokenSelectors).pipe(
      switchMap((accessToken) => {
        return next.handle(
          req.clone({ setHeaders: { Authorization: BarearTokenString(accessToken) } })
        );
      })
    );
  }
}
