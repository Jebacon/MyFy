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
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Housing', 'Investments/Savings', 'Debt', 'Expenses'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

    public barChartData: ChartDataSets[] = [
      { data: [100, 100, 100, 100, 100, 100, 100], label: 'Target'},
      { data: [(28), 48, 40, 19, 86, 27, 90], label: 'Actual'}
    ];

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    var sessionId = window.sessionStorage.getItem("ID");
    //var total_income: number;
    //var total_debts: number;
    //var total_housing: number;
    //var total_invest_save: number;
    //var total_expense: number;

    var total_income = 0;
    var total_debts = 0;
    var total_housing = 0;
    var total_invest_save = 0;
    var total_expense = 0;
    // for others we need either all caps or camel case or other- look in dashboard compents at 200 at change table (see cases)
    this.dbService.post("getUserIncome", {"USERID": sessionId}).subscribe(data =>{
      //total_income = 0;
      for (var element in data){
        var stringify = JSON.parse(JSON.stringify(data[element]))
        var wage = stringify["AMOUNT"]
        total_income += wage;
      }
      console.log('Total Income: ', total_income);
    })
    this.dbService.post("getUserDebts", {"userId": sessionId}).subscribe(data =>{
      for (var element in data){
        var stringify = JSON.parse(JSON.stringify(data[element]))
        var balance = stringify["BALANCE"]
        total_debts += balance;
      }
    })
    this.dbService.post("getUserExpenses", {"userId": sessionId}).subscribe(data =>{
      for (var element in data){
        var stringify = JSON.parse(JSON.stringify(data[element]))
        var cost = stringify["COSTS"]
        total_expense += cost;
      }
    })
    this.dbService.post("getUserHousing", {"USERID": sessionId}).subscribe(data =>{
      for (var element in data){
        var stringify = JSON.parse(JSON.stringify(data[element]))
        var cost = stringify["COSTS"]
        total_housing += cost;
      }
    })
    this.dbService.post("getUserInvestments", {"userId": sessionId}).subscribe(data =>{
      for (var element in data){
        var stringify = JSON.parse(JSON.stringify(data[element]))
        var invest_amnt  = stringify["INVEST_AMNT$"]
        total_invest_save += invest_amnt;
      }
    })
    var housingT = total_income* .3;
    var investT = total_income*.1;
    var debtT = total_income* .10;
    var expenseT = total_income* .5;
    
    //['Housing', 'Investments/Savings', 'Debt', 'Expenses', 'Discretionary']
    //var targets by percents- will store in the list below
    this.barChartData[0].data = [housingT, investT, debtT, expenseT];
    this.barChartData[1].data = [total_housing, total_invest_save, total_debts, total_expense];

    
    

  }
}


