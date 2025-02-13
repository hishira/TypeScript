import { MessageService } from 'primeng/api';
import { AuthenticationApiService } from '../api/authentication.api';
import { UserApiSerivce } from '../api/user.api';
import { AppConfigurationService } from './app-configuration.service';
import {
  RefreshInterceptorProvider,
  SerivceErrorProvider,
  TokenInterceptorProvider,
} from './shared/providers/httpProviders';
import { ToastService } from './shared/services/toast.service';
import { Providers } from './shared/types/shared';

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
