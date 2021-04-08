import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: [ './bar-chart.component.css' ]
})
export class BarChartComponent  {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Housing', 'Investments/Savings', 'Debt', 'Expenses', 'Discretionary'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

    public barChartData: ChartDataSets[] = [
      { data: [100, 100, 100, 100, 100, 100, 100], label: 'Target'},
      { data: [(28), 48, 40, 19, 86, 27, 90], label: 'Actual'}
    ];

  constructor() { }

  ngOnInit() {
  }
}

