import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { ChartService } from '../services/chart.service';
import { EntryPlot } from '../models/dashboard/entry-plot.model';

declare var Plotly: any;


@Directive({
  selector: '[appChartInit]'
})
export class ChartInitDirective implements OnInit {
  plot: any;
  // tslint:disable-next-line:no-input-rename
  @Input('appChartInit') plotType: string;

  constructor(private el: ElementRef,
    private dashboardService: DashboardService,
    private chartService: ChartService) { }

  ngOnInit() {
    const plot = this.dashboardService.getDashboardPlots();
    if (plot) {
      this.initBasicChart(plot);
    }
    this.dashboardService.getDashboardObs().subscribe((dashboard) => {
      this.initBasicChart(dashboard.plot, dashboard.totalCompleted);
    });
  }

  initBasicChart(plot: EntryPlot, totalCompleted?: number) {
    if (this.plotType === 'all-activity') {
      this.plot = this.chartService.initChart1Data(plot);
    } else if (this.plotType === 'target-activity') {
      this.plot = this.chartService.initChart2Data(plot, totalCompleted);
    }
    this.basicChart();
  }


  basicChart() {
    const element = this.el.nativeElement;
    Plotly.newPlot(element, this.plot.data, this.plot.style);
    Plotly.relayout(element, {'xaxis.autorange': true,
    'yaxis.autorange': true });
  }
}
