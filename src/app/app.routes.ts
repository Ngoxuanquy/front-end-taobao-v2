import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivateChild: [authGuard],
    loadChildren: () =>
      import('./components/layout_container/layout.routes').then(
        (m) => m.WELCOME_ROUTES
      ),
  },
  // {
  //   path: 'auth/login',
  //   component: LoginComponent,
  // },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/layout_login/welcome.routes').then(
        (m) => m.WELCOME_ROUTES
      ),
  },
];
