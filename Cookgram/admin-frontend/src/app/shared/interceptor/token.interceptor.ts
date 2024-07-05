import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { MainStore } from '../../../store/main.store';
import { Store } from '@ngrx/store';
import { GetAccessTokenSelectors } from '../../../store/jwt/selectors';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store<MainStore>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(GetAccessTokenSelectors).pipe(
      switchMap((accessToken) => {
        return next.handle(
          req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
        );
      })
    );
  }
}
