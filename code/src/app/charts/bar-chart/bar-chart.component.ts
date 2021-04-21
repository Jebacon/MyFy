import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets, ChartData } from 'chart.js';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Label } from 'ng2-charts';
import { DatabaseService } from '../../services/database.service'
import * as Chart from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: [ './bar-chart.component.css' ]
})
export class BarChartComponent implements OnInit {


  constructor(private dbService: DatabaseService) { }
  
  ngOnInit() {}}