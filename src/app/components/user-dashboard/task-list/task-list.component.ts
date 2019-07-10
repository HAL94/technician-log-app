import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

import { Task } from 'src/app/models/dashboard/task.model';
import { TaskListService } from 'src/app/services/task-list.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {

  taskList: Task[];
  tlSubscription: Subscription;
  pageSize = 3;
  pageSizeOptions = [this.pageSize, 10, 25, 100];
  currentPage = 1;
  totalTasks;
  listToBeFetched = 'All';

  @Output() public scroller = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private taskListService: TaskListService) { }


  ngOnInit() {
    const tasks = this.taskListService.getTaskList();

    if (tasks !== null && typeof tasks !== 'undefined') {
      this.taskList = tasks;
      this.totalTasks = this.taskListService.getTotalTasks();
    }

    this.tlSubscription = this.taskListService.getTaskListAndTotalTasksObs()
    .subscribe(tslat => {
      this.taskList = tslat.taskList;
      // console.log(this.taskList);
      this.totalTasks = tslat.totalTasks;
      // console.log(this.totalTasks);
    });

  }

  async onAddTask(taskInput: string) {
    let t: Task;

    if (!taskInput) {
      return;
    }

    t = {
      title: taskInput
    };
    await this.taskListService.addTaskAPI(t);
    await this.refreshSelectedList('ALL');
  }

  async refreshSelectedList(status: string) {
    const currentList = this.listToBeFetched;

    this.listToBeFetched = status;


    await this.taskListService.getTaskListAPI(this.listToBeFetched.toUpperCase(),
    this.currentPage, this.pageSize);

    if (currentList !== this.listToBeFetched) {
      this.paginator.firstPage();
    } else if (this.taskList.length === 0) {
      this.paginator.previousPage();
    }

  }

  async onStatusChange() {
    if (this.listToBeFetched === 'COMPLETE' || this.listToBeFetched === 'PENDING') {
      await this.refreshSelectedList(this.listToBeFetched);
    }
  }

  onChangedPage(pageData: any) {
    this.currentPage = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;
    this.taskListService.getTaskListAPI(this.listToBeFetched, this.currentPage, this.pageSize);
  }

  ngOnDestroy() {
    if (this.tlSubscription) {
      this.tlSubscription.unsubscribe();
    }

  }

}
