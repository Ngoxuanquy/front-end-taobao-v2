import { Routes } from '@angular/router';
import { LoginComponent } from '../../../auth/login/login.component';
import { Layout_loginComponent } from './layout_login.component';
import { authGuard } from '../../../auth/auth.guard';
import { RegisterComponent } from '../../../auth/register/register.component';

export const LOGIN_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  }
];
