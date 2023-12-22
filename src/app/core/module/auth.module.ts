import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from '../../auth/login/login.component';
import { AuthRoutingModule } from '../../auth/auth-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, AuthRoutingModule],
  declarations: [],
})
export class AuthModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
