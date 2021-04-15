import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { DatabaseService } from '../services/database.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  user: User = {
    id: "",
    fName: '',
    lName: '',
    email: '',
    password: '',
  };
  verification: User = {
    id: "null",
    fName: '',
    lName: '',
    email: '',
    password: '',
  }
  Current_input = "Income"
  Current_table = ""
  incomes: any
  debts: any
  expenses: any
  table: any
  rows = 0
  incomeRows = 0
  debtRows = 0
  expenseRows = 0
  verified = false
  
  constructor(private dbService: DatabaseService, private router: Router) { }
  message = ""
  ngOnInit(): void {

    let storageID = window.sessionStorage;
    if(storageID.getItem("Email") == null || storageID.getItem("Password") == null){
      console.log("Please login first")
      this.router.navigate(['login'])
    } else {
      var email = storageID.getItem("Email")
      var pass = storageID.getItem("Password")
      var dbData = this.dbService.post("login",{"email": email, "password": pass})
      console.log(email)
      console.log(pass)
      dbData.forEach(val => this.sort(val))
      this.incomes = new Map<number, Array<Object>>()
      this.debts = new Map<number, Array<Object>>()
      this.expenses = new Map<number, Array<Object>>()
      this.table = new Map<number, Array<Object>>()
      //this.dbService.post("getUserIncome",{"USERID":window.sessionStorage.getItem("ID")}).subscribe(data => this.updateIncomeData(data))
      //this.dbService.post("getUserDebts",{"userId":window.sessionStorage.getItem("ID")}).subscribe(data => this.updateDebtData(data))
      //this.dbService.post("getUserExpenses",{"userId":window.sessionStorage.getItem("ID")}).subscribe(data => this.updateExpenseData(data))
    }
  }

  generateTable(id:any, dataT: string): void{
    console.log("Generating table for: "+dataT)
    
  }

  deleteTableRow(id:any): void{
    console.log("deleting: "+id)
    document.getElementById(id)?.remove()
    var ID = this.table.get(id)[0]
    switch(this.Current_table){
      case "Income":{
        this.dbService.post("deleteIncome",{"INCOMEID":ID}).subscribe()
        break;
      }
      case "Debt": {
        this.dbService.post("deleteDebt",{"debtId":ID}).subscribe()
        break;
      }
      case "Expense": {
        this.dbService.post("deleteExpense",{"expenseId":ID}).subscribe()
        break;
      }
      case "Housing": {
        console.log("Not Yet Implemented")
        break;
      }
      default: {
        console.log("Not sure how you got here but stop it.")
      }
    }
  }
  
  createExpenseData():void{

    var table = (document.getElementById("expenseTable") as HTMLTableElement)

    var name = (document.getElementById("expenseName") as HTMLInputElement).value
    var cost = (document.getElementById("expenseCost") as HTMLInputElement).value
    
    this.dbService.post("newExpense",{"name":name,"costs":cost,"userId":window.sessionStorage.getItem("ID")}).subscribe()
    this.dbService.post("getUserExpenses",{"userId":window.sessionStorage.getItem("ID")}).subscribe(data => this.updateExpenseData(data))


  }
  updateExpenseData(data:Array<Object>):void{
    this.expenseRows = 0
    var table = (document.getElementById("expenseTable") as HTMLTableElement)
    table.innerHTML = "<tr><th>Name</th><th>Cost</th><th></th></tr>"
    console.log(data[0])
    for(var element in data){
      var stringify = JSON.parse(JSON.stringify(data[element]))
      var ID = stringify["EXPENSEID"]
      var name = stringify["NAME"]
      var cost = stringify["COSTS"]
      
      this.updateExpenseDataHelper(ID,name,cost)
    };
  }
  updateExpenseDataHelper(ID: number, name: string, cost: number):void{
    var table = (document.getElementById("expenseTable") as HTMLTableElement)
    this.incomeRows += 1
    var newRow = table.insertRow(-1)
    //create button and set attributes
    var button = document.createElement('button')
    button.textContent = "delete"
    button.setAttribute("id", "e"+this.incomeRows)
    newRow.setAttribute("id", "e"+this.incomeRows)
    console.log("setting id: e" + this.incomeRows)
    this.expenses.set("e"+this.incomeRows,[ID,name,cost])

    //handles events for the button
    //button.addEventListener("click", (event) => this.deleteTableRow(button.getAttributeNode("id")?.value,"expense"), false)

    newRow.innerHTML = "<td>"+name+"</td><td>$"+cost+"</td>"
    newRow.appendChild(button)
  }
  
  async verifyStep(data?: string): Promise<void>{
    console.log("verify step")
    //once verification happens successfully the verification ID is no longer null and we wont ping the server to verify us endlessly
    if(this.verification.id == "null"){
      await this.verify()
    }
    var v_ID = (this.user.id == this.verification.id)
    var v_email = (this.user.email === this.verification.email)
    var v_password = (this.user.password === this.verification.password)
    console.log('ID: '+v_ID+'  EMAIL: '+v_email+'  PASSWORD: '+v_password)
    if(v_ID && v_email && v_password){
      console.log("verification success")
      this.message = ""
    } else {
      this.message = "Failed to verify credentials"
    }
  }

  async verify(): Promise<void>{
    let storageID = window.sessionStorage;
    this.user.id = storageID.getItem("ID")!;
    this.user.email = storageID.getItem("Email")!
    this.user.password = storageID.getItem("Password")!
    var dbData = this.dbService.post("login",{"email": (document.getElementById("verify-email") as HTMLInputElement).value, "password": (document.getElementById("verify-password") as HTMLInputElement).value})
      //pulls the data out of its object form for sorting
    await dbData.forEach(val => this.sort(val))
    }
    //sorts login data for ease of use
    sort(data:any): void{
      try{
      this.verification.id = data[0]["ID"];
      this.verification.email = data[0]["EMAIL"];
      this.verification.password = data[0]["PASSWORD"];
      console.log("verification assets")
      } catch (Error) {
      this.verified = false
      }
    }
    //manages switching between input types for asset creation
    dataType(data: string) : void{
      this.Current_input = data
      if(data == "Debt"){
        (document.getElementById("rateDiv") as HTMLElement).style.display = "block"
      } else {
        (document.getElementById("rateDiv") as HTMLElement).style.display = "none"
      }
    }
    //handles submitting data to tables
    submitEntry(): void{
      var name = (document.getElementById("name")as HTMLInputElement).value
      var value = (document.getElementById("value")as HTMLInputElement).value
      var freq = (document.getElementById("freq")as HTMLInputElement).value
      switch(this.Current_input){
        case "Income": {
          console.log("submitting income");
          this.dbService.post("newIncome",{"SRCNAME":name,"AMOUNT":value,"PAYCYCLE":freq,"USERID":window.sessionStorage.getItem("ID")}).subscribe()
          break;
        }
        case "Debt": {
          console.log("submitting debt");
          var rate = (document.getElementById("rate")as HTMLInputElement).value
          this.dbService.post("newDebt",{"debtName":name,"balance":value,"rate":rate,"payTime":freq,"userId":window.sessionStorage.getItem("ID")}).subscribe()
          break;
        }
        case "Expense": {
          console.log("submitting expense");
          this.dbService.post("newExpense",{"name":name,"costs":value,"userId":window.sessionStorage.getItem("ID")}).subscribe()
          break;
        }
        case "Housing": {
          console.log("submitting housing");
          break;
        }
        default: {
          console.log("how in the heck did you get here?")
        }
      }
      //handles updating the table if the table being viewed is the same as the new data input
      if(this.Current_input == this.Current_table){
        this.changeTable(this.Current_table)
      }
    }
    //handles generating a delete button (this is required to be methodized due to local scoping issues)
    generateButton(): any {
      var button = document.createElement('button')
                button.setAttribute("id", ""+this.rows)
                //calls previously created button into code by its unique ID to change attributes
                //var button = document.getElementById(""+this.rows)!
                button.textContent = "delete"

                //handles events for the button
                button.addEventListener("click", (event) => this.deleteTableRow(button.getAttributeNode("id")?.value), false)

                return button
    }
    //handles switching between display tables
    changeTable(table: string) : void{
      this.rows = 0
      this.Current_table = table
      //clears the table of excess data
      this.table.clear()
      switch(table){
        case "Income":{
          console.log("changing table to income");
          
          this.dbService.post("getUserIncome",{"USERID":window.sessionStorage.getItem("ID")}).subscribe(data => {
            //selects the table in our HTML
            var table = (document.getElementById("Table") as HTMLTableElement)
            table.innerHTML = "<tr><th>Name</th><th>Amount</th><th>Frequency</th><th></th></tr>"
            console.log(data[0])
            for(var element in data){
              var stringify = JSON.parse(JSON.stringify(data[element]))
              var ID = stringify["INCOMEID"]
              var name = stringify["SRCNAME"]
              var wage = stringify["AMOUNT"]
              var freq = stringify["PAYCYCLE"]
      
              this.rows += 1
              //creates a new row at the end of the existing table
              var newRow = table.insertRow(-1)

              newRow.setAttribute("id", ""+this.rows)
              console.log("setting id: " + this.rows)
              this.table.set(""+this.rows,[ID,name,wage,freq])
              //sets the inner html for our new row
              newRow.innerHTML = "<td>"+name+"</td><td>$"+wage+"</td><td>"+freq+"</td>"
              newRow.appendChild(this.generateButton())
    };
          })
          break;
        }
        case "Debt": {
          console.log("changing table to debt");
          this.dbService.post("getUserDebts",{"userId":window.sessionStorage.getItem("ID")}).subscribe(data => {
            var table = (document.getElementById("Table") as HTMLTableElement)
            table.innerHTML = "<tr><th>Name</th><th>Balance</th><th>Rate</th><th>Frequency</th><th></th></tr>"
            console.log(data)
            for(var element in data){
              var stringify = JSON.parse(JSON.stringify(data[element]))
              var ID = stringify["DEBTID"]
              var name = stringify["DEBT_NAME"]
              var wage = stringify["BALANCE"]
              var rate = stringify["RATE"]
              var freq = stringify["PAYTIME"]
      
              this.rows += 1
              var newRow = table.insertRow(-1)
              //create button and set attributes
              
              newRow.setAttribute("id", ""+this.rows)
              console.log("setting id: " + this.rows)
              this.table.set(""+this.rows,[ID,name,wage,rate,freq])

              newRow.innerHTML = "<td>"+name+"</td><td>$"+wage+"</td><td>"+rate+"%</td><td>"+freq+"</td>"
              newRow.appendChild(this.generateButton())
    };
          })
          break;
        }
        case "Expense": {
          console.log("changing table to expenses");
          this.dbService.post("getUserExpenses",{"userId":window.sessionStorage.getItem("ID")}).subscribe(data => {
            this.expenseRows = 0
            var table = (document.getElementById("Table") as HTMLTableElement)
            table.innerHTML = "<tr><th>Name</th><th>Cost</th><th></th></tr>"
            console.log(data[0])
            for(var element in data){
              var stringify = JSON.parse(JSON.stringify(data[element]))
              var ID = stringify["EXPENSEID"]
              var name = stringify["NAME"]
              var cost = stringify["COSTS"]
      
              //this.updateExpenseDataHelper(ID,name,cost)
              this.rows += 1
              var newRow = table.insertRow(-1)

              newRow.setAttribute("id", ""+this.rows)
              console.log("setting id: " + this.rows)
              this.table.set(""+this.rows,[ID,name,cost])

              newRow.innerHTML = "<td>"+name+"</td><td>$"+cost+"</td>"
              newRow.appendChild(this.generateButton())
              };
          })
          break;
        }
        case "Housing": {
          console.log("changing table to housing");
          break;
        }
      }
    }

    handleData() : void{
      console.log("consider it done")
    }
}