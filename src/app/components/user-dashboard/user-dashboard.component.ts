import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Dashboard } from 'src/app/models/dashboard/dashboard.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  dashboard: Dashboard;
  dashboardSubscription: Subscription;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getDashboardAPI();
    this.dashboardSubscription = this.dashboardService.getDashboardObs().subscribe(dashboard => {
      this.dashboard = dashboard;
      // console.log(this.dashboard);
    });
  }


  scrollToCard($target) {
    $target.scrollIntoView();
  }


  ngOnDestroy() {
    if (this.dashboardSubscription) {
      this.dashboardSubscription.unsubscribe();
    }
  }
}
