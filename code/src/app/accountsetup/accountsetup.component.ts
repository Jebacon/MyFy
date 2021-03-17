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

    //checks to insure the two passwords provided are the same
    if(this.user.password === repass){
      //constructs a string to be posted
      var data = "newUser/"+this.user.fName+"&"+this.user.lName+"&"+this.user.email+"&"+this.user.password
      //posts the data to add the user to the database
      this.dbService.post(data).subscribe(
        response => {
          //if the response is empty it means an account exists already by the email given
          if (response === null) {
            //this displays to the user the email is taken
            this.message = "There exists an account by that email already"
          } else{
            //displays to the user that the account was created successfuly 
            this.message = "Account creation successful!"
            console.log("User succesffully created");
            this.created = true;
          }
        },
        //in the event of an error this will catch and print it without crashing
        error => {
          console.log("an error has occured")
          console.log(error)
        });
    }else{
      this.message = ("The passwords provided to not match!")
    }
  }

}
