import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { authGuard } from './auth.guard';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
