import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { DatabaseService } from '../services/database.service';


@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html'
})

export class AssessmentComponent implements OnInit {
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
  incomes: any
  debts: any
  expenses: any
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
      this.dbService.post("getUserIncome",{"USERID":window.sessionStorage.getItem("ID")}).subscribe(data => this.updateIncomeData(data))
      this.dbService.post("getUserDebts",{"userId":window.sessionStorage.getItem("ID")}).subscribe(data => this.updateDebtData(data))
      this.dbService.post("getUserExpenses",{"userId":window.sessionStorage.getItem("ID")}).subscribe(data => this.updateExpenseData(data))
    }
  }
  deleteTableRow(id:any, dataT: string): void{
    console.log("deleting: "+id)
    document.getElementById(id)?.remove()
    if(dataT == "income"){
      var ID = this.incomes.get(id)[0]
      console.log(ID)
      this.dbService.post("deleteIncome",{"INCOMEID":ID}).subscribe()
    } else if(dataT == "debt"){
      console.log(this.debts.get(id))
      var ID = this.debts.get(id)[0]
      this.dbService.post("deleteDebt",{"debtId":ID}).subscribe()
    } else if(dataT == "expense"){
      console.log(this.expenses.get(id))
      var ID = this.expenses.get(id)[0]
      this.dbService.post("deleteExpense",{"expenseId":ID}).subscribe()
    } else {
      console.log("dataType not recognized")
    }
  }
  createIncomeData():void{
    //this.incomeRows += 1
    var table = (document.getElementById("incomeTable") as HTMLTableElement)
    //var newRow = table.insertRow(-1)
    var name = (document.getElementById("incomeName") as HTMLInputElement).value
    var wage: number = +(document.getElementById("incomeWage") as HTMLInputElement).value
    var freq = (document.getElementById("incomeFreq") as HTMLInputElement).value
    this.dbService.post("newIncome",{"SRCNAME":name,"AMOUNT":wage,"PAYCYCLE":freq,"USERID":window.sessionStorage.getItem("ID")}).subscribe()
    this.dbService.post("getUserIncome",{"USERID":window.sessionStorage.getItem("ID")}).subscribe(data => this.updateIncomeData(data))

  }
  updateIncomeData(data:Array<Object>):void{
    this.incomeRows = 0
    var table = (document.getElementById("incomeTable") as HTMLTableElement)
    table.innerHTML = "<tr><th>Name</th><th>Amount</th><th>Frequency</th><th></th></tr>"
    console.log(data[0])
    for(var element in data){
      var stringify = JSON.parse(JSON.stringify(data[element]))
      var ID = stringify["INCOMEID"]
      var name = stringify["SRCNAME"]
      var wage = stringify["AMOUNT"]
      var freq = stringify["PAYCYCLE"]
      
      this.updateIncomeDataHelper(ID,name,wage,freq)
    };
  }
  updateIncomeDataHelper(ID: number, name: string, wage: number, freq: string):void{
    var table = (document.getElementById("incomeTable") as HTMLTableElement)
    this.incomeRows += 1
    var newRow = table.insertRow(-1)
    //create button and set attributes
    var button = document.createElement('button')
    button.textContent = "delete"
    button.setAttribute("id", "i"+this.incomeRows)
    newRow.setAttribute("id", "i"+this.incomeRows)
    console.log("setting id: i" + this.incomeRows)
    this.incomes.set("i"+this.incomeRows,[ID,name,wage,freq])

    //handles events for the button
    button.addEventListener("click", (event) => this.deleteTableRow(button.getAttributeNode("id")?.value,"income"), false)

    newRow.innerHTML = "<td>"+name+"</td><td>$"+wage+"</td><td>"+freq+"</td>"
    newRow.appendChild(button)
  }
  createDebtData():void{
    //this.debtRows += 1
    var table = (document.getElementById("debtTable") as HTMLTableElement)
    //var newRow = table.insertRow(-1)
    var name = (document.getElementById("debtName") as HTMLInputElement).value
    var wage = (document.getElementById("debtAmount") as HTMLInputElement).value
    var rate = (document.getElementById("debtRate") as HTMLInputElement).value
    var freq = (document.getElementById("debtFreq") as HTMLInputElement).value

    this.dbService.post("newDebt",{"debtName":name,"balance":wage,"rate":rate,"payTime":freq,"userId":window.sessionStorage.getItem("ID")}).subscribe()
    this.dbService.post("getUserDebts",{"userId":window.sessionStorage.getItem("ID")}).subscribe(data => this.updateDebtData(data))

  }
  updateDebtData(data:Array<Object>):void{
    this.debtRows = 0
    var table = (document.getElementById("debtTable") as HTMLTableElement)
    table.innerHTML = "<tr><th>Name</th><th>Balance</th><th>Rate</th><th>Frequency</th><th></th></tr>"
    console.log(data)
    for(var element in data){
      var stringify = JSON.parse(JSON.stringify(data[element]))
      var ID = stringify["DEBTID"]
      var name = stringify["DEBT_NAME"]
      var wage = stringify["BALANCE"]
      var rate = stringify["RATE"]
      var freq = stringify["PAYTIME"]
      
      this.updateDebtDataHelper(ID,name,wage,rate,freq)
    };
  }
  updateDebtDataHelper(ID: number, name: string, wage: number, rate: number, freq: string):void{
    var table = (document.getElementById("debtTable") as HTMLTableElement)
    this.debtRows += 1
    var newRow = table.insertRow(-1)
    //create button and set attributes
    var button = document.createElement('button')
    button.textContent = "delete"
    button.setAttribute("id", "d"+this.debtRows)
    newRow.setAttribute("id", "d"+this.debtRows)
    console.log("setting id: d" + this.debtRows)
    this.debts.set("d"+this.debtRows,[ID,name,wage,rate,freq])

    //handles events for the button
    button.addEventListener("click", (event) => this.deleteTableRow(button.getAttributeNode("id")?.value,"debt"), false)

    newRow.innerHTML = "<td>"+name+"</td><td>$"+wage+"</td><td>"+rate+"%</td><td>"+freq+"</td>"
    newRow.appendChild(button)
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
    button.addEventListener("click", (event) => this.deleteTableRow(button.getAttributeNode("id")?.value,"expense"), false)

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
    dataType(data: string) : void{
      console.log(data)
      if(data == "Income"){
        this.createIncomeData()
      } else if (data == "Debt"){
        this.createDebtData()
      } else if (data == "Expense"){
        this.createExpenseData()
      }
    }
    handleData() : void{
      console.log("consider it done")
    }
}
