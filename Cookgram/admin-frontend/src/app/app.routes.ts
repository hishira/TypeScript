import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminContainerComponent } from './pages/admin-container/admin-container.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'admin',
    component: AdminContainerComponent,
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
