import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Status } from 'src/app/models/status';
import { Task } from 'src/app/models/dashboard/task.model';
import { MatCheckbox, MatDialog } from '@angular/material';
import { TaskListService } from 'src/app/services/task-list.service';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy {
  @Output() statusChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() taskObj: {task: Task, index: number};
  task: Task;
  index: number;
  showTaskEdit: boolean;
  dialogSubscription: Subscription;
  constructor(private tasklistService: TaskListService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.task = this.taskObj.task;
    this.index = this.taskObj.index;
    this.showTaskEdit = false;
  }

  async onStatusChange(checkbox: MatCheckbox) {
    const checked = checkbox.checked;

    if (checked) {
      this.task.status = Status.COMPLETE;
    } else {
      this.task.status = Status.PENDING;
    }

    for (let i = 0; i < this.task.subtasks.length; i++) {
      this.task.subtasks[i].status = this.task.status;
    }


    await this.tasklistService.editTaskAPI(this.task, this.index);
    this.statusChange.emit(this.taskObj);
  }

  onTitleChange(newTitle: string) {
    this.task.title = newTitle;
    this.tasklistService.editTaskAPI(this.task, this.index);
  }

  onEditTask() {

    const dialogRef = this.dialog.open(TaskEditComponent, {
      width: '55%',
      height: 'auto',
      data: this.taskObj
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(data => {

      if (data) {
        this.task = data.task;
        this.index = data.index;
        this.tasklistService.editTaskAPI(this.task, this.index);
      }
    });
  }

  ngOnDestroy() {
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
  }
}
