import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { DatabaseService } from '../services/database.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
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
  rows = 0
  verified = false
  constructor(private dbService: DatabaseService, private router: Router) { }
  message = ""
  dataT="Income"
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

      this.getIncomeData()
    }
  }
  getIncomeData():void{
    this.rows += 1
    var table = (document.getElementById("incomeTable") as HTMLTableElement)
    var newRow = table.insertRow(-1)
    var name = (document.getElementById("incomeName") as HTMLInputElement).value
    var wage = (document.getElementById("incomeWage") as HTMLInputElement).value
    var freq = (document.getElementById("incomeFreq") as HTMLInputElement).value
    var button = document.createElement('button')
    button.setAttribute("id", "delete"+this.rows)
    button.textContent = "delete"
    button.setAttribute("type","button")
    button.setAttribute("onClick", "$(this).closest('tr').remove()")
    //button.addEventListener("click", this.deleteIncome, false)
    //button.setAttribute("formtarget","self")
    newRow.innerHTML = "<td>"+name+"</td><td>"+wage+"</td><td>"+freq+"</td>"
    newRow.appendChild(button)

    //table.append("name", "1","never")
  }
  deleteIncome(r:any): void{
    (document.getElementById("incomeTable") as HTMLTableElement).deleteRow(r.rowIndex)
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
        this.getIncomeData()
      } else if (data == "Debt"){
        console.log("congrats its debt")
      } else if (data == "Expense"){
        console.log("propogate me daddy")
      }
    }
    handleData() : void{
      console.log("consider it done")
    }
}
