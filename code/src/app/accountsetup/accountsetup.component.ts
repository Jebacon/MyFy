import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { User } from '../models/user.model'

@Component({
  selector: 'app-accountsetup',
  templateUrl: './accountsetup.component.html',
  styleUrls: ['./accountsetup.component.css']
})
export class AccountsetupComponent implements OnInit {

  constructor(private dbService: DatabaseService) { }
  user: User = {
    fName: '',
    lName: '',
    email: '',
    password: '',
  };
  created = false;
  ngOnInit(): void {
  }

  addUser(): void {
    this.user.fName = (document.getElementById("fName") as HTMLInputElement).value
    this.user.lName = (document.getElementById("lName") as HTMLInputElement).value
    this.user.email = (document.getElementById("email") as HTMLInputElement).value
    this.user.password = (document.getElementById("password") as HTMLInputElement).value
    
    this.dbService.create(this.user).subscribe(
      response => {
        console.log(response)
        this.created=true;
      },
      error => {
        console.log(error)
      });
  }

}
