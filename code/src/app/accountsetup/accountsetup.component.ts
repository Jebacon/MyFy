import { Component, OnInit } from '@angular/core';
import { User } from './accountsetup.model'; 
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-accountsetup',
  templateUrl: './accountsetup.component.html',
  styleUrls: ['./accountsetup.component.css']
})
export class AccountsetupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
