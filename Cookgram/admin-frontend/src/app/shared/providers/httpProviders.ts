import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RefreshInterceptor } from '../interceptor/refresh.interceptor';
import { ServerErrorInterceptor } from '../interceptor/serverError.interceptor';
import { TokenInterceptor } from '../interceptor/token.interceptor';
import { Providers } from '../types/shared';

export const SerivceErrorProvider: Providers = {
  provide: HTTP_INTERCEPTORS,
  useClass: ServerErrorInterceptor,
  multi: true,
};

export const RefreshInterceptorProvider: Providers = {
  provide: HTTP_INTERCEPTORS,
  useClass: RefreshInterceptor,
  multi: true,
};

export const TokenInterceptorProvider: Providers = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
};
