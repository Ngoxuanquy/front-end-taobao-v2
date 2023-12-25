import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard'; // Corrected import
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  {
    path: 'admin',
    // canActivate: [authGuard], // Corrected case
    loadChildren: () =>
      import('./core/layout/layout_container/layout.routes').then(
        (m) => m.ADMIN_ROUTES
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/layout/layout_login/layouLogin.routes').then(
        (m) => m.LOGIN_ROUTES
      ),
  },
  {
    path: '**',
    redirectTo: '/admin',
    pathMatch: 'full',
  },
];
