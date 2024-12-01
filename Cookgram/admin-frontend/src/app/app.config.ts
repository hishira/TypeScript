import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { currentUserReducers } from '../store/currentUser/reducers';
import { jwtReducers } from '../store/jwt/reducers';
import { Http_Interceptors, ServiceProviders } from './app.providers';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideStore(),
    provideState({ name: 'jwt', reducer: jwtReducers }),
    provideState({ name: 'currentUser', reducer: currentUserReducers }),
    provideHttpClient(withInterceptorsFromDi()),
    ...ServiceProviders,
    ...Http_Interceptors,
  ],
};
