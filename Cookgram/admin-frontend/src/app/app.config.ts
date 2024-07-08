import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { jwtReducers } from '../store/jwt/reducers';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ServerErrorInterceptor } from './shared/interceptor/serverError.interceptor';
import { MessageService } from 'primeng/api';
import { ToastService } from './shared/services/toast.service';
import { RefreshInterceptor } from './shared/interceptor/refresh.interceptor';
import { TokenInterceptor } from './shared/interceptor/token.interceptor';
import { AuthenticationApiService } from '../api/authentication.api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideStore(),
    provideState({ name: 'jwt', reducer: jwtReducers }),
    provideHttpClient(withInterceptorsFromDi()),
    MessageService,
    AuthenticationApiService,
    ToastService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
};
