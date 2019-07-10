import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatCheckbox, MatDialog } from '@angular/material';

import { SubtaskEditComponent } from './subtask-edit/subtask-edit.component';
import { Status } from 'src/app/models/status';
import { Subtask } from 'src/app/models/dashboard/subtask.model';
import { TaskListService } from 'src/app/services/task-list.service';
import { Task } from 'src/app/models/dashboard/task.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.css']
})
export class SubtaskComponent implements OnInit, OnDestroy {
  @Input() subtaskObj: {task: Task, subtask: Subtask; stindex: number, tindex: number};
  task: Task;
  subtask: Subtask;
  stindex: number;
  tindex: number;
  dialogSubscription: Subscription;

  constructor(private tasklistService: TaskListService, private dialog: MatDialog) { }

  ngOnInit() {
    this.subtask = this.subtaskObj.subtask;
    this.task = this.subtaskObj.task;
    this.stindex = this.subtaskObj.stindex;
    this.tindex = this.subtaskObj.tindex;
  }

  onStatusChange(checkbox: MatCheckbox) {
    const checked = checkbox.checked;

    if (checked) {
      this.subtask.status = Status.COMPLETE;
    } else {
      this.subtask.status = Status.PENDING;
    }

    this.task.subtasks[this.stindex] = this.subtask;

    this.tasklistService.editSubtaskAPI(this.tindex, this.stindex, this.subtask);
  }

  onTitleChange(newTitle: string) {
    this.subtask.title = newTitle;

    const tasks = this.tasklistService.getTaskList();

    const task = tasks[this.tindex];
    task.subtasks[this.stindex] = this.subtask;

    this.tasklistService.editSubtaskAPI(this.tindex, this.stindex, this.subtask);
  }

  onEditTask() {
    const dialogRef = this.dialog.open(SubtaskEditComponent, {
      width: '55%',
      height: 'auto',
      data: this.subtaskObj
    });
    this.dialogSubscription = dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log(data);
        this.tasklistService.editSubtaskAPI(data.tindex, data.stindex, data.subtask);
      }
    });
  }

  ngOnDestroy() {
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
  }
}
