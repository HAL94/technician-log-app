import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AngularMaterialModule } from './modules/shared-modules/angular-material/angular-material.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { SharedModule } from './modules/shared-modules/shared/shared.module';

import { AppComponent } from './app.component';
import { TechEntryComponent } from './components/tech-entry/tech-entry.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpInterceptorProviders } from './interceptors/http-interceptors';
import { CreateEntryComponent } from './components/tech-entry/create-entry/create-entry.component';
import { TodayEntriesComponent } from './components/today-entries/today-entries.component';

@NgModule({
  declarations: [
    AppComponent,
    TechEntryComponent,
    HeaderComponent,
    CreateEntryComponent,
    TodayEntriesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularMaterialModule,
    AuthModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    HttpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
