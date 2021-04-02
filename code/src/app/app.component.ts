import { Component } from '@angular/core';

declare const openTab: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})

export class AppComponent {
  title = 'MyFy - One place for all your finances.';
 
  openTab(){
    openTab();
  }
}
