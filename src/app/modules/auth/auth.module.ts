import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from '../../components/login/login.component';
import { SignupComponent } from '../../components/signup/signup.component';
import { AngularMaterialModule } from '../shared-modules/angular-material/angular-material.module';
import { SharedModule } from '../shared-modules/shared/shared.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedModule
  ],
  exports: [LoginComponent, SignupComponent]
})
export class AuthModule { }
