import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dbService: DatabaseService, private router: Router) { }
  message = "test"
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
    }
  }

  sort(data:any): void{
    try{
      let sortID = window.sessionStorage
      var email = data[0]['EMAIL']
      var pass = data[0]['PASSWORD']
      sortID.setItem("ID",data[0]["ID"]);
      sortID.setItem("Email", data[0]["EMAIL"]);
      sortID.setItem("Password", data[0]["PASSWORD"]);
      this.message = "Welcome, " +data[0]["FNAME"]+" "+data[0]["LNAME"]

    } catch (Error) {
      this.message = "Failure to gather users information"
    }
  }

}
