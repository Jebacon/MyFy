import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Email } from '../models/email.model' 
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private dbService : DatabaseService, private router: Router) { }
    email: Email = {
      name: '',
      returnEmail: '',
      emailBody: '',
    };
    created = false;
    message = ' ';
   

  ngOnInit(): void {
  }

  submitForm(){
    // submit the form with all the values in the field.
    this.email.name = (document.getElementById("name") as HTMLInputElement).value
    this.email.returnEmail = (document.getElementById("returnEmail") as HTMLInputElement).value
    this.email.emailBody = (document.getElementById("emailBody") as HTMLInputElement).value
    var dbData = this.dbService.post("emailTeam",{"userName": ' ', "name" : this.email.name, "returnEmail": this.email.returnEmail, "subjectHeader": ' ', "emailBody": this.email.emailBody}).subscribe()
    this.message="Email sent successfully!";
  }

  
}
