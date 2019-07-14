import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from 'src/app/components/login/login.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';
import { TechEntryComponent } from 'src/app/components/tech-entry/tech-entry.component';
import { CreateEntryComponent } from 'src/app/components/tech-entry/create-entry/create-entry.component';

import { AuthGuard } from '../../guards/auth/auth.guard';
import { AfterAuthGuard } from '../../guards/auth/after-auth.guard';
import { TodayEntriesComponent } from 'src/app/components/tech-entry/today-entries/today-entries.component';
import { UserDashboardComponent } from 'src/app/components/user-dashboard/user-dashboard.component';
import { HomeComponent } from 'src/app/components/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'login', component: LoginComponent, canActivate: [AfterAuthGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [AfterAuthGuard]},
  {path: 'techentries', component: TechEntryComponent, canActivate: [AuthGuard]},
  {path: 'add-entry', component: CreateEntryComponent, canActivate: [AuthGuard]},
  {path: 'edit-entry/:techentryId', component: CreateEntryComponent, canActivate: [AuthGuard]},
  {path: 'today-entries', component: TodayEntriesComponent, canActivate: [AuthGuard]},
  {path: 'user-profile', loadChildren: '../user-profile/user-profile.module#UserProfileModule'},
  {path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
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
