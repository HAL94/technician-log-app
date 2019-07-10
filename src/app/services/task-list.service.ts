import { Injectable } from '@angular/core';
import { HttpClient } from '@angular//common/http';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment';

import { Task } from '../models/dashboard/task.model';
import { Subtask } from '../models/dashboard/subtask.model';

@Injectable({
  providedIn: 'root'
})

export class TaskListService {
  private taskListUpdate = new Subject<{taskList: Task[], totalTasks: number}>();
  private totalTasks;
  private taskList: Task[];
  private HTTP_URLS = environment.TASKLIST_URLS;

  constructor(private httpClient: HttpClient) {
  }

  async getTaskListAPI(listStatus: string, currentPage: number, pageSize: number) {
    try {
      const response = await this.httpClient.get<{tasks: Task[], totalTasks: number}>(this.HTTP_URLS.getTaskList,
      {params: {statusFilter: listStatus, page: String(currentPage), pagesize: String(pageSize)}})
      .toPromise();

      this.setTaskListAndTotalTasks(response.tasks, response.totalTasks);
    } catch (error) {
      console.log(error);
    }

  }

  async addTaskAPI(t: Task) {
    try {
      const response = await this.httpClient
      .post<{task: Task, totalTasks: number}>(this.HTTP_URLS.addTask, t)
      .toPromise();
      const task = { ...response.task };

      this.taskList.unshift(task);
      this.setTaskListAndTotalTasks([...this.taskList], response.totalTasks);
    } catch (error) {
      console.log(error);
    }
  }

  async editTaskAPI(t: Task, index: number) {
    try {
      const url = this.HTTP_URLS.editTask + t.id;
      const response = await this.httpClient
        .patch<{newTask: Task}>(url, t)
        .toPromise();
      this.taskList[index] = response.newTask;
      this.setTaskListAndTotalTasks([...this.taskList], this.getTotalTasks());
    } catch (error) {
      console.log(error);
    }
  }

  async editSubtaskAPI(tindex: number, stindex: number, subtask: Subtask) {
    try {
      const url = this.HTTP_URLS.editSubtask + subtask.id;
      const response = await this.httpClient
      .patch<{newSubtask: Subtask}>(url, subtask).toPromise();

      this.taskList[tindex].subtasks[stindex] = response.newSubtask;
      this.setTaskListAndTotalTasks([...this.taskList], this.getTotalTasks());

    } catch (error) {
      console.log(error);
    }
  }

  async deleteSubtaskAPI(tindex: number, stindex: number, subtask: Subtask) {
    try {
      const stid = subtask.id;
      const url = this.HTTP_URLS.deleteSubtask + stid;

      await this.httpClient.delete(url).toPromise();

      this.taskList[tindex].subtasks.splice(stindex, 1);

      this.setTaskListAndTotalTasks([...this.taskList], this.getTotalTasks());
    } catch (error) {
      console.log(error);
    }

  }

  async deleteTaskAPI(task: Task, index: number) {
    try {
      const url = this.HTTP_URLS.deleteTask + task.id;
      const response = await this.httpClient
      .delete<{message: string, totalTasks: number}>(url)
      .toPromise();
      this.taskList.splice(index, 1);
      this.setTaskListAndTotalTasks([...this.taskList], response.totalTasks);
    } catch (error) {
      console.log(error);
    }
  }

  getTaskListAndTotalTasksObs() {
    return this.taskListUpdate.asObservable();
  }

  getTotalTasks() {
    return this.totalTasks;
  }

  getTaskList() {
    return this.taskList;
  }

  setTaskListAndTotalTasks(newTaskList: Task[], totalTasks: number) {
    this.taskList = newTaskList;
    this.totalTasks = totalTasks;
    this.taskListUpdate.next({taskList: [...this.taskList], totalTasks: totalTasks});
  }
}
