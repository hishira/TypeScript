import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EnvironmentProviders, Provider } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthenticationApiService } from '../api/authentication.api';
import { UserApiSerivce } from '../api/user.api';
import { AppConfigurationService } from './app-configuration.service';
import { RefreshInterceptor } from './shared/interceptor/refresh.interceptor';
import { ServerErrorInterceptor } from './shared/interceptor/serverError.interceptor';
import { TokenInterceptor } from './shared/interceptor/token.interceptor';
import { ToastService } from './shared/services/toast.service';

type Providers = Provider | EnvironmentProviders;

const SerivceErrorProvider: Providers = {
  provide: HTTP_INTERCEPTORS,
  useClass: ServerErrorInterceptor,
  multi: true,
};

const RefreshInterceptorProvider: Providers = {
  provide: HTTP_INTERCEPTORS,
  useClass: RefreshInterceptor,
  multi: true,
};

const TokenInterceptorProvider: Providers = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
};

export const ServiceProviders: Providers[] = [
  MessageService,
  AppConfigurationService,
  AuthenticationApiService,
  UserApiSerivce,
  ToastService,
];
export const Http_Interceptors: Providers[] = [
  SerivceErrorProvider,
  RefreshInterceptorProvider,
  TokenInterceptorProvider,
];
