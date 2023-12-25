import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard'; // Corrected import
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard], // Corrected case
    loadChildren: () =>
      import('./core/pipes/layout_container/layout.routes').then(
        (m) => m.WELCOME_ROUTES
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/pipes/layout_login/layouLogin.routes').then(
        (m) => m.WELCOME_ROUTES
      ),
    // canActivate: [authGuard],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./core/pipes/layout_login/layouLogin.routes').then(
        (m) => m.WELCOME_ROUTES
      ),
  },
];
