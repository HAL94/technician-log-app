import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared-modules/shared/shared.module';

import { UserDashboardComponent } from '../../components/user-dashboard/user-dashboard.component';
import { TaskListComponent } from '../../components/user-dashboard/task-list/task-list.component';
import { TaskComponent } from '../../components/user-dashboard/task-list/task/task.component';
import { TaskEditComponent } from '../../components/user-dashboard/task-list/task/task-edit/task-edit.component';
import { SubtaskComponent } from '../../components/user-dashboard/task-list/subtask/subtask.component';
import { SubtaskEditComponent } from '../../components/user-dashboard/task-list/subtask/subtask-edit/subtask-edit.component';
import { WeeklyEntriesComponent } from '../../components/user-dashboard/weekly-entries/weekly-entries.component';

import { ChartInitDirective } from '../../directives/chart-init.directive';
import { TextareaAutosizeDirective } from '../../directives/textarea-autosize.directive';
import { CheckboxHoverDirective } from '../../directives/checkbox-hover.directive';



@NgModule({
  declarations: [
    UserDashboardComponent,
    TaskListComponent,
    TaskComponent,
    TaskEditComponent,
    SubtaskComponent,
    SubtaskEditComponent,
    ChartInitDirective,
    TextareaAutosizeDirective,
    CheckboxHoverDirective,
    WeeklyEntriesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    UserDashboardComponent,
    TaskListComponent,
    TaskComponent,
    TaskEditComponent,
    SubtaskComponent,
    SubtaskEditComponent,
    ChartInitDirective,
    TextareaAutosizeDirective,
    CheckboxHoverDirective,
    WeeklyEntriesComponent
  ],
  entryComponents: [TaskEditComponent, SubtaskEditComponent]
})
export class UserDashboardModule { }
