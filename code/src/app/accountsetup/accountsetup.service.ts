import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../accountsetup/accountsetup.model'

@Injectable({
  providedIn: 'root'
})
export class AccountsetupService {

  constructor(public http: HttpClient) { }

  addUser(user: User) {
    console.log('DEAR LORD SEND HELP');
    this.http.post('/addUser', user).subscribe(data => {
      console.log(data);
    })
  }
}
