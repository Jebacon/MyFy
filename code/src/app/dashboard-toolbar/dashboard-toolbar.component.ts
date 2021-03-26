import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-toolbar',
  templateUrl: './dashboard-toolbar.component.html',
  styleUrls: ['./dashboard-toolbar.component.css']
})
export class DashboardToolbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  go_settings(): void {
    this.router.navigate(['settings'])
  }
}
