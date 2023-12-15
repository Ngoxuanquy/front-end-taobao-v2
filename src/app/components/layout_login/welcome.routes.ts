import { Routes } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';
import { LoginComponent } from '../../auth/login/login.component';
import { Layout_loginComponent } from './layout_login.component';
import { authGuard } from '../../auth/auth.guard';

export const WELCOME_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: '',
        children: [{ path: 'login', component: LoginComponent }],
      },
    ],
  },
];
