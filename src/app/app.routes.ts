import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard'; // Corrected import
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./core/layout/layout-client/layout.routes').then(
        (m) => m.CLIENT_ROUTES
      ),

  },
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
    redirectTo: '/',
    pathMatch: 'full',
  },
  { path: 'product/:id', component: ProductDetailComponent },
];
