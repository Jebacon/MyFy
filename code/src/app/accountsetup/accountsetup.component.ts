import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { User } from '../models/user.model'
import { isNull } from '@angular/compiler/src/output/output_ast';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-accountsetup',
  templateUrl: './accountsetup.component.html',
  styles: []
})
export class AccountsetupComponent implements OnInit {

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

  addUser(): void {
    //pull in the unput data 
    this.user.fName = (document.getElementById("fName") as HTMLInputElement).value
    this.user.lName = (document.getElementById("lName") as HTMLInputElement).value
    this.user.email = (document.getElementById("email") as HTMLInputElement).value
    this.user.password = (document.getElementById("password") as HTMLInputElement).value
    var repass = (document.getElementById("confirm_password") as HTMLInputElement).value
    var regex = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/)
    var isvalid = regex.test(this.user.email)
    //checks to insure the two passwords provided are the same
    if((this.user.password === repass) && isvalid){
      //posts the data to add the user to the database
      this.dbService.post("newUser",{"fName": this.user.fName, "lName":this.user.lName, "email":this.user.email, "password":this.user.password}).subscribe( data => this.addUserHelper(data))
    }else if(isvalid){
      this.message = ("The passwords provided to not match!")
    } else {
      this.message = ("The email is not a valid email address")
    }
  }
  addUserHelper(data: any) : void {
    if(data.sqlMessage.includes("fNameLengthCheck") || data.sqlMessage.includes("lNameLengthCheck")){
      alert("First and last name must be atleast one character")
    } else if (data.sqlMessage.includes("emailLengthCheck")){
      alert("Email address must be atleast 6 characters long")
    } else if (data.sqlMessage.includes("passwordLengthCheck")){
      alert("Password must be atleast 3 characters long")
    } else if (data.sqlMessage.includes("Duplicate entry")){
      alert("Email is already in use")
    } else {
      alert("Account Creation Successful")
    }
  }

}
