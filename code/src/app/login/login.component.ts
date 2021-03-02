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
    let returned: any
    var fuck = this.dbService.get(data)
    //fuck.subscribe(val => console.log(val))
    fuck.forEach(val => this.sort(val))
    console.log(returned)
  }

  sort(data:Map<any,any>): void{
    console.log("sorting");
    data.get("ID");
    console.log(this.user.id);//test
    //data.forEach((val: any) => console.log(val));
  }
}