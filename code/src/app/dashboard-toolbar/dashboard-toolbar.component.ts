import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-dashboard-toolbar',
  templateUrl: './dashboard-toolbar.component.html',
  styleUrls: ['./dashboard-toolbar.component.css']
})
export class DashboardToolbarComponent implements OnInit {

  constructor(private dbService: DatabaseService, private router: Router) { }

  ngOnInit(): void {
  }

  go_settings(): void {
    this.router.navigate(['settings'])
  }
  go_analytics(): void{
    var sessionId = window.sessionStorage.getItem("ID");

    this.dbService.post("getUserIncome", {"USERID": sessionId}).subscribe(data =>{
      var local_income = 0
      for (var element in data){
        var stringify = JSON.parse(JSON.stringify(data[element]))
        var wage = stringify["AMOUNT"]
        switch(stringify["PAYCYCLE"]){
          case "Weekly":{
            local_income += (wage * 52)
            break;
          } case "Bi-Weekly":{
            local_income += (wage * 26)
            break;
          } case "Monthly":{
            local_income += (wage * 12)
            break;
          } case "Bi-Monthly":{
            local_income += (wage * 6)
            break;
          } case "Yearly":{
            local_income += wage
          }
        }
      }
      console.log('in barchart: Total Income: ', local_income);
      window.sessionStorage.setItem("Income", ""+local_income)
    })

   this.dbService.post("getUserDebts", {"userId": sessionId}).subscribe(data =>{
     var local_debts = 0
     for (var element in data){
       var stringify = JSON.parse(JSON.stringify(data[element]))
       var balance = stringify["BALANCE"]
       switch(stringify["PAYTIME"]){
        case "Weekly":{
          local_debts += (balance * 52)
          break;
        } case "Bi-Weekly":{
          local_debts += (balance * 26)
          break;
        } case "Monthly":{
          local_debts += (balance * 12)
          break;
        } case "Bi-Monthly":{
          local_debts += (balance * 6)
          break;
        } case "Yearly":{
          local_debts += balance
        }
      }
     }
     window.sessionStorage.setItem("Debt", ""+local_debts)
   })
   this.dbService.post("getUserExpenses", {"userId": sessionId}).subscribe(data =>{
     var local_expense = 0
     for (var element in data){
       var stringify = JSON.parse(JSON.stringify(data[element]))
       var cost = stringify["COSTS"]
       switch(stringify["FREQUENCY"]){
         case "Weekly":{
           local_expense += (cost * 52)
          break;
         } case "Bi-Weekly":{
           local_expense += (cost * 26)
          break;
         } case "Monthly":{
           local_expense += (cost * 12)
          break;
         } case "Bi-Monthly":{
           local_expense += (cost * 6)
          break;
         } case "Yearly":{
           local_expense += cost
          break;
         }
       }
     }
     window.sessionStorage.setItem("Expense", ""+local_expense)
   })
   this.dbService.post("getUserHousing", {"USERID": sessionId}).subscribe(data =>{
     var local_housing = 0
     for (var element in data){
       var stringify = JSON.parse(JSON.stringify(data[element]))
       var cost = stringify["COSTS"]
       switch(stringify["FREQUENCY"]){
        case "Weekly":{
          local_housing += (cost * 52)
          break;
        } case "Bi-Weekly":{
          local_housing += (cost * 26)
         break;
        } case "Monthly":{
          local_housing += (cost * 12)
         break;
        } case "Bi-Monthly":{
          local_housing += (cost * 6)
         break;
        } case "Yearly":{
          local_housing += cost
         break;
        }
      }
     }
     window.sessionStorage.setItem("Housing", ""+local_housing)
   })
   this.dbService.post("getUserInvestments", {"userId": sessionId}).subscribe(data =>{
     var local_invest_save = 0
     for (var element in data){
       var stringify = JSON.parse(JSON.stringify(data[element]))
       var invest_amnt  = stringify["INVEST_AMNT$"]
       switch(stringify["FREQUENCY"]){
        case "Weekly":{
          local_invest_save += (invest_amnt * 52)
          break;
        } case "Bi-Weekly":{
          local_invest_save += (invest_amnt * 26)
         break;
        } case "Monthly":{
          local_invest_save += (invest_amnt * 12)
         break;
        } case "Bi-Monthly":{
          local_invest_save += (invest_amnt * 6)
         break;
        } case "Yearly":{
          local_invest_save += invest_amnt
         break;
        }
      }
     }
     window.sessionStorage.setItem("Invest_save", ""+local_invest_save)
   })
   setTimeout(()=>
   {
    console.log("timed wait")
   },1000)
   var total_income = 0
   total_income = +window.sessionStorage.getItem("Income")!

   window.sessionStorage.setItem("housingT",""+(total_income * .3))
   window.sessionStorage.setItem("investT",""+(total_income * .1))
   window.sessionStorage.setItem("debtT",""+(total_income * .1))
   window.sessionStorage.setItem("expenseT",""+(total_income * .5))
   setTimeout(()=>
   {
    this.router.navigate(['analytics'])
   },
   2000);
    
  }
}
