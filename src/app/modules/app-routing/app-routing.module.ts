import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from 'src/app/components/login/login.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';
import { TechEntryComponent } from 'src/app/components/tech-entry/tech-entry.component';
import { CreateEntryComponent } from 'src/app/components/tech-entry/create-entry/create-entry.component';

import { AuthGuard } from 'src/app/auth/auth.guard';
import { AfterAuthGuard } from '../../auth/after-auth.guard';
import { TodayEntriesComponent } from 'src/app/components/today-entries/today-entries.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AfterAuthGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [AfterAuthGuard]},
  {path: 'techentries', component: TechEntryComponent, canActivate: [AuthGuard]},
  {path: 'add-entry', component: CreateEntryComponent, canActivate: [AuthGuard]},
  {path: 'edit-entry/:techentryId', component: CreateEntryComponent, canActivate: [AuthGuard]},
  {path: 'today-entries', component: TodayEntriesComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AfterAuthGuard
  ]
})
export class AppRoutingModule { }
