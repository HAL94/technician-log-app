import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  userCreatedAt: Date;
  private MIN_TARGET = 3;

  constructor(private userService: UserService) {
    this.userCreatedAt = this.userService.getUser().createdAt;
  }

  initChart1Data(plot: any) {
    const data = [
      {
        x: plot.completedPlot.map(p => p.date),
        y: plot.completedPlot.map(p => p.y),
        mode: 'markers',
        marker: {
          color: 'rgba(115, 127, 171, 0.95)',
          line: {
            color: 'rgba(115, 127, 171, 1.0)',
            width: 1,
          },
          symbol: 'circle',
          size: 13
        },
        name: 'COMPLETED'
      },
      {
        x: plot.pendingPlot.map(p => p.date),
        y: plot.pendingPlot.map(p => p.y),
        mode: 'markers',
        marker: {
          color: 'rgba(51, 220, 255, 0.95)',
          line: {
            color: 'rgba(51, 220, 255, 1.0)',
            width: 1,
          },
          symbol: 'circle',
          size: 13
        },
        name: 'PENDING'
      }
    ];
    const style = {
      title: {
        text: 'General Activity',
        font: {
          family: 'Courier New, monospace',
          size: 18
        },
        xref: 'paper',
        y: 1,
        x: 0
      },
      margin: { t: 20},
      xaxis: {
        type: 'date',
        range: [this.userCreatedAt, new Date()],
        showgrid: false,
        showline: false,
        title: 'Date',
        titlefont: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        },
        tickformat: '%d %B'
      },
      yaxis: {
        title: 'Entries',
        titlefont: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        },
        showgrid: true,
        showline: false
      },
      plot_bgcolor: 'rgba(255, 255, 255, 1)',
      showlegend: true,
      legend: {
        // x: 1,
        y: 0.5,
        'orientation': 'v'
      }
    };

    return {
      data: data,
      style: style
    };
  }

  initChart2Data(plot: any, totalEntries: number) {
    const targetPlot = plot.completedPlot.filter(p => {
      return p.y >= this.MIN_TARGET;
    });
    const data = [
      {
        x: targetPlot.map(p => p.date),
        y: targetPlot.map(p => p.y),
        mode: 'markers',
        marker: {
          color: 'rgba(115, 127, 171, 0.95)',
          line: {
            color: 'rgba(115, 127, 171, 1.0)',
            width: 1,
          },
          symbol: 'circle',
          size: 13
        },
        name: 'Target'
      }
    ];
    const style = {
      title: {
        text: 'Target Achievement',
        font: {
          family: 'Courier New, monospace',
          size: 18
        },
        xref: 'paper',
        y: 1,
        x: 0
      },
      margin: { t: 20},
      xaxis: {
        type: 'date',
        range: [this.userCreatedAt, new Date()],
        showgrid: false,
        showline: false,
        title: 'Date',
        titlefont: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        },
        tickformat: '%d %B'
      },
      yaxis: {
        range: [this.MIN_TARGET, totalEntries],
        title: 'Entries',
        titlefont: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        },
        showgrid: true,
        showline: false
      },
      plot_bgcolor: 'rgba(255, 255, 255, 1)',
      showlegend: true,
      legend: {
        // x: 1,
        y: 0.5,
        'orientation': 'v'
      }
    };

    return {
      data: data,
      style: style
    };
  }
}
