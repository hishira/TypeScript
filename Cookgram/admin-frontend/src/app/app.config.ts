import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { AuthenticationApiService } from '../api/authentication.api';
import { UserApiSerivce } from '../api/user.api';
import { currentUserReducers } from '../store/currentUser/reducers';
import { jwtReducers } from '../store/jwt/reducers';
import { routes } from './app.routes';
import {
  RefreshInterceptorProvider,
  SerivceErrorProvider,
  TokenInterceptorProvider,
} from './shared/app.providers';
import { ToastService } from './shared/services/toast.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideStore(),
    provideState({ name: 'jwt', reducer: jwtReducers }),
    provideState({ name: 'currentUser', reducer: currentUserReducers }),
    provideHttpClient(withInterceptorsFromDi()),
    MessageService,
    AuthenticationApiService,
    UserApiSerivce,
    ToastService,
    SerivceErrorProvider,
    RefreshInterceptorProvider,
    TokenInterceptorProvider,
  ],
};
