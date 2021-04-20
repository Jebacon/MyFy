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
export class BarChartComponent implements OnInit {
  income?: number;
  debts?: number;
  housing?: number;
  invest_save?: number;
  expense?: number;
  housingT_per = .3;
  investT_per = .1;
  debtT_per = .1;
  expenseT_per = .5;
  
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Housing', 'Investments/Savings', 'Debt', 'Expenses'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
      { data: [50,30,40,20], label: 'Targets'},
      { data: [], label: ''}
    ];

  constructor(private dbService: DatabaseService) { 
    // var total_income = 0;
    // var total_debts = 0;
    // var total_housing = 0;
    // var total_invest_save = 0;
    // var total_expense = 0;
  }

  ngOnInit() {
    //var income: number;
    var sessionId = window.sessionStorage.getItem("ID");
    //var total_income: number;
    //var total_debts: number;
    //var total_housing: number;
    //var total_invest_save: number;
    //var total_expense: number;

    //var total_income = 0;
    //var total_debts = 0;
    //var total_housing = 0;
    //var total_invest_save = 0;
    //var total_expense = 0;
    // for others we need either all caps or camel case or other- look in dashboard compents at 200 at change table (see cases)
    this.dbService.post("getUserIncomeSum", {"USERID": sessionId}).subscribe(data =>{
      
      for (var element in data){
        var stringify = JSON.parse(JSON.stringify(data[element]))
        var wage = stringify["SUM(AMOUNT)"]
        this.income += wage;
        console.log('in barchart: inside for loop Total Income: ', this.income);
        //this.total_income = total_income; 
      }
      console.log('in barchart:outside for loop Total Income: ', this.income);
      return this.income;
    })
    this.dbService.post("getUserDebts", {"userId": sessionId}).subscribe(data =>{
      for (var element in data){
        var stringify = JSON.parse(JSON.stringify(data[element]))
        var balance = stringify["BALANCE"]
        this.debts += balance;
      }
    })
    this.dbService.post("getUserExpenses", {"userId": sessionId}).subscribe(data =>{
      for (var element in data){
        var stringify = JSON.parse(JSON.stringify(data[element]))
        var cost = stringify["COSTS"]
        this.expense += cost;
      }
    })
    this.dbService.post("getUserHousing", {"USERID": sessionId}).subscribe(data =>{
      for (var element in data){
        var stringify = JSON.parse(JSON.stringify(data[element]))
        var cost = stringify["COSTS"]
        this.housing += cost;
      }
    })
    this.dbService.post("getUserInvestments", {"userId": sessionId}).subscribe(data =>{
      for (var element in data){
        var stringify = JSON.parse(JSON.stringify(data[element]))
        var invest_amnt  = stringify["INVEST_AMNT$"]
        this.invest_save += invest_amnt;
      }
    })
  //   var housingT =  this.income* .3;
  //   var investT = total_income*.1;
  //   var debtT = total_income* .10;
  //   var expenseT = total_income* .5;
    
  //   //['Housing', 'Investments/Savings', 'Debt', 'Expenses', 'Discretionary']
  //   //var targets by percents- will store in the list below
  //  // this.barChartData[0].data = [housingT, investT, debtT, expenseT];
  //   //this.barChartData[1].data = [total_housing, total_invest_save, total_debts, total_expense];
  //   this.barChartData = [{data:[housingT, investT, debtT, expenseT],label: 'Target'},
  //                         {data:[total_housing, total_invest_save, total_debts, total_expense], label: 'Actual'}];
    

    
    

  }
}


