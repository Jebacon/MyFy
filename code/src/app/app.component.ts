import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <!-- toolbar -->
  <app-toolbar></app-toolbar>

  <!-- The home page -->
  <app-home></app-home>
  
  <!-- routes will be go here -->
  <router-outlet></router-outlet>

  `,
  styles: []
})

export class AppComponent {
  title = 'MyFy - One place for all your finances.';
}
