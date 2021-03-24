import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { User } from '../models/user.model'
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {


  constructor(private dbService: DatabaseService, private router: Router) { }
  //an instantiated user for ease of data use
  user: User = {
    id: "",
    fName: '',
    lName: '',
    email: '',
    password: '',
  };
  created = false;
  //reference to the html which allows for binding
  message = ""

  ngOnInit(): void {
  }
  //master method for controlling login
  login(): void {
    this.user.email = (document.getElementById("email") as HTMLInputElement).value
    this.user.password = (document.getElementById("password") as HTMLInputElement).value
    var data = this.user.email+"&"+this.user.password
    var dbData = this.dbService.post("login",{"email": this.user.email, "password":this.user.password})
    //pulls the data out of its object form for sorting
    dbData.forEach(val => this.sort(val))

  }
  //sorts login data for ease of use
  sort(data:any): void{
    try{
    this.user.id = data[0]['ID']
    this.user.fName = data[0]['FNAME']
    this.user.lName = data[0]['LNAME']
    this.user.email = data[0]['EMAIL']
    this.user.password = data[0]['PASSWORD']
    let storageID = window.sessionStorage;
    storageID.setItem("ID",data[0]["ID"]);
    storageID.setItem("Email", data[0]["EMAIL"]);
    storageID.setItem("Password", data[0]["PASSWORD"]);
    this.message = "Success!"
    this.router.navigate(['dashboard'])
    } catch (Error) {
     this.message = "No user found by that email and password"
    }
  }
}