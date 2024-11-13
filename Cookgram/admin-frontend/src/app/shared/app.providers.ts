import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EnvironmentProviders, Provider } from '@angular/core';
import { ServerErrorInterceptor } from './interceptor/serverError.interceptor';
import { RefreshInterceptor } from './interceptor/refresh.interceptor';
import { TokenInterceptor } from './interceptor/token.interceptor';

type Providers = Provider | EnvironmentProviders;
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