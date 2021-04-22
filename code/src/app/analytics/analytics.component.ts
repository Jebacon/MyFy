import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions} from 'chart.js';
import { Label, Color} from 'ng2-charts';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  constructor(private dbService: DatabaseService) { }
  //yearly targets and actuals
  targets_Year = [0]
  actuals_Year = [0]
  targets_Month = [0]
  actuals_Month = [0]
  
  ngOnInit(): void {
    var sessionId = window.sessionStorage.getItem("ID");
    var housingT = +window.sessionStorage.getItem("housingT")!
    var housingA = +window.sessionStorage.getItem("Housing")!
    var investT = +window.sessionStorage.getItem("investT")!
    var investA = +window.sessionStorage.getItem("Invest_save")!
    var debtT = +window.sessionStorage.getItem("debtT")!
    var debtA = +window.sessionStorage.getItem("Debt")!
    var expenseT = +window.sessionStorage.getItem("expenseT")!
    var expenseA = +window.sessionStorage.getItem("Expense")!
    //clears placeholder 
    this.targets_Year.pop()
    this.targets_Year = [housingT, housingA,investT, debtT, expenseT]

    //clear placeholder
    //this.actuals_Year.pop()
    this.actuals_Year = [housingA, investA, debtA, expenseA]

    this.targets_Month = [+(housingT/12).toFixed(2), +(investT/12).toFixed(2), +(debtT/12).toFixed(2), +(expenseT/12).toFixed(2)]
    this.actuals_Month = [+(housingA/12).toFixed(2), +(investA/12).toFixed(2), +(debtA/12).toFixed(2), +(expenseA/12).toFixed(2)]
    
    //var labels = ["Housing Target","Actual Housing","Investments/savings Target","Actual Investments/Savings","Debt Target","Actual Debt","Expenses Target","Actual Expenses"]
    var modlabels = ["Housing","Investments/savings","Debt","Expenses"]

    const barData_Year = {
      labels: modlabels,
      datasets: [
          {
              label: "Target",
              backgroundColor: ['rgba(255, 99, 132, 0.5)','rgba(255, 99, 132, 0.5)','rgba(255, 99, 132, 0.5)','rgba(255, 99, 132, 0.5)'],
              data: this.targets_Year,
              Color: "rgba(220,220,220,0.5)"
          },
          {
              label: "Actual",
              backgroundColor: ['rgba(99, 255, 132, 0.5)','rgba(99, 255, 132, 0.5)','rgba(99, 255, 132, 0.5)','rgba(99, 255, 132, 0.5)'],
              data: this.actuals_Year,
              Color: [10,10,220,5]
          }
      ]
  };

  const barData_Month = {
    labels: modlabels,
    datasets: [
        {
            label: "Target",
            backgroundColor: ['rgba(255, 99, 132, 0.5)','rgba(255, 99, 132, 0.5)','rgba(255, 99, 132, 0.5)','rgba(255, 99, 132, 0.5)'],
            data: this.targets_Month,
            Color: "rgba(220,220,220,0.5)"
        },
        {
            label: "Actual",
            backgroundColor: ['rgba(99, 255, 132, 0.5)','rgba(99, 255, 132, 0.5)','rgba(99, 255, 132, 0.5)','rgba(99, 255, 132, 0.5)'],
            data: this.actuals_Month,
            Color: [10,10,220,5]
        }
    ]
};

    var chart_year = new Chart((document.getElementById("chart-Year") as HTMLCanvasElement),{
      type: 'bar',
      data: barData_Year
    })
    chart_year.render()

    var chart_month = new Chart((document.getElementById("chart-Month") as HTMLCanvasElement),{
      type: 'bar',
      data: barData_Month,
    })
    chart_month.render()

  }

}
