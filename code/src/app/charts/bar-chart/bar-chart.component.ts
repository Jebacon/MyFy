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
  public barChartLabels: Label[] = ['Housing', 'Expenses', 'Discretionary', 'Invest/Save', 'Debt'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

    public barChartData: ChartDataSets[] = [
      { data: [100, 100, 100, 100, 100, 100, 100], label: 'Target'},
      { data: [(28), 48, 40, 19, 86, 27, 90], label: 'Actual'}
    ];

  constructor() { }

  ngOnInit() {
    //make query call for user.invest whatever. 
    //Ask Jon
    // - done it in login and account setup.ts
    //- look at login.ts line 34-38 and sortingmethod below it. 
    //baseIncome = getUserIncome();
    //look at services. db,services.ts http services
  }
}

