import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { User } from '../models/user.model'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {


  constructor(private dbService: DatabaseService) { }
  //an instantiated user for ease of data use
  user: User = {
    id: 0,
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

  login(): void {
    this.user.email = (document.getElementById("email") as HTMLInputElement).value
    this.user.password = (document.getElementById("password") as HTMLInputElement).value
    var data = "login/"+this.user.email+"&"+this.user.password
    var dbData = this.dbService.get(data)
    dbData.forEach(val => this.sort(val))
  }

  sort(data:any): void{
    this.user.id = data[0]['ID']
    this.user.fName = data[0]['FNAME']
    this.user.lName = data[0]['LNAME']
    this.user.email = data[0]['EMAIL']
    this.user.password = data[0]['PASSWORD']
  }
}