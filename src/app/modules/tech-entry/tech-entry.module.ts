import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared-modules/shared/shared.module';
import { AngularMaterialModule } from '../shared-modules/shared/angular-material/angular-material.module';

import { TechEntryComponent } from '../../components/tech-entry/tech-entry.component';
import { CreateEntryComponent } from '../../components/tech-entry/create-entry/create-entry.component';
import { TodayEntriesComponent } from '../../components/tech-entry/today-entries/today-entries.component';
import { TechEntryTableComponent } from '../../components/tech-entry/tech-entry-table/tech-entry-table.component';

@NgModule({
  declarations: [
    TechEntryComponent,
    CreateEntryComponent,
    TodayEntriesComponent,
    TechEntryTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule
  ],
  exports: [
    TechEntryComponent,
    CreateEntryComponent,
    TodayEntriesComponent,
    TechEntryTableComponent
  ]
})
export class TechEntryModule { }
