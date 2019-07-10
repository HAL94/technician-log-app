import { Component, OnInit } from '@angular/core';

import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-weekly-entries',
  templateUrl: './weekly-entries.component.html',
  styleUrls: ['./weekly-entries.component.css']
})
export class WeeklyEntriesComponent implements OnInit {
  days: any[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday'
  ];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.days = this.days.map(d => {
      const dayStat = this.dashboardService.getDayStat(d);
      return {
        d: d,
        dayStat: dayStat
      };
    });
  }
}
