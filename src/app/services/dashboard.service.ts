import { Injectable } from '@angular/core';
import { HttpClient } from '@angular//common/http';
import { environment } from '../../environments/environment';

import { Dashboard, WeeklyEntry } from '../models/dashboard/dashboard.model';
import { Subject } from 'rxjs';
import { Status } from '../models/status';
import { TaskListService } from './task-list.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  dashboard: Dashboard;

  private dashboardUpdate = new Subject<Dashboard>();
  private HTTP_URLS = environment.DASHBOARD_URLS;
  private days: { [key: string]: number; } = {};

  constructor(private httpClient: HttpClient, private taskListService: TaskListService) {
    this.days['sunday'] = 1;
    this.days['monday'] = 2;
    this.days['tuesday'] = 3;
    this.days['wednesday'] = 4;
    this.days['thursday'] = 5;
    this.days['friday'] = 6;
    this.days['saturday'] = 7;
  }

  async getDashboardAPI() {
    try {
      const response = await this.httpClient.get<{dashboard: Dashboard}>(this.HTTP_URLS.getDashboard)
      .toPromise();

      this.dashboard = response.dashboard;

      this.taskListService.setTaskListAndTotalTasks(this.dashboard.tasks, this.dashboard.totalTasks);

      this.dashboardUpdate.next({...this.dashboard});
    } catch (error) {
      console.log(error);
    }
  }

  getDashboardObs() {
    return this.dashboardUpdate.asObservable();
  }

  getDashboard() {
    return this.dashboard;
  }

  getDashboardTasks() {
    return this.dashboard.tasks;
  }

  getDashboardPlots() {
    return this.dashboard.plot;
  }

  getDayStat(day: string) {
    const dayNum = this.days[day];

    const dayStat: WeeklyEntry = {
      count_complete: 0,
      count_pending: 0,
      day: 0,
      status: Status.UNSET
    };
    const weeklyEntries = this.dashboard.weeklyEntries;

    for (const doc of weeklyEntries) {
      if (doc.day === dayNum) {
        dayStat.count_complete = doc.count_complete;
        dayStat.count_pending = doc.count_pending;
        dayStat.day = doc.day;
        dayStat.status = doc.status;
        return dayStat;
      }
    }

    return dayStat;
  }


}
