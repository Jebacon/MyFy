import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Label } from 'ng2-charts';
import { DatabaseService } from '../../services/database.service'
@Component({
  selector: 'app-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: [ './bar-chart.component.css' ]
})
export class BarChartComponent  {
  
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Housing', 'Investments/Savings', 'Debt', 'Expenses', 'Discretionary'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

    barChartData: ChartDataSets[] = [
      { data: [100, 100, 100, 100, 100, 100, 100], label: 'Target'},
      { data: [(28), 48, 40, 19, 86, 27, 90], label: 'Actual'}
    ];

  constructor(private dbService: DatabaseService) {
    
   
   }
 

  ngOnInit(actual:any[], target:any[]) {
    // target values
    this.barChartData[0]['data'] = target;
    this.barChartData[1]['data'] = actual;

  }
}

