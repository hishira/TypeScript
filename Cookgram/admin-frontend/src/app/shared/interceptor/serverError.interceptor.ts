import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { ServerErrorMessage } from './consts';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private readonly toastService: ToastService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        this.toastService.showError(ServerErrorMessage);
        throw new Error(error.message);
      })
    );
  }
}
