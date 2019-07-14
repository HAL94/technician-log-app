import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppInterceptorProviders } from './interceptors/app-interceptors';

import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './modules/shared-modules/shared/shared.module';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';

import { TechEntryModule } from './modules/tech-entry/tech-entry.module';
import { UserDashboardModule } from './modules/user-dashboard/user-dashboard.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule,
    TechEntryModule,
    BrowserAnimationsModule,
    UserDashboardModule,
    SharedModule
  ],
  providers: [
    AppInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
