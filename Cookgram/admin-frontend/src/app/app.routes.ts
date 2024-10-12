import { Routes } from '@angular/router';
import { AdminContainerComponent } from './pages/admin-container/admin-container.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ContextResolver } from './shared/resolvers/context.resolver';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'admin',
    component: AdminContainerComponent,
    resolve: [ContextResolver],
    children: [
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/users/users.component').then((a) => a.UsersComponent),
      },
      { path: '', redirectTo: 'users', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
