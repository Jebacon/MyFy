import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
declare const openTab: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma-rtl.min.css']
})

export class AppComponent {
  title = 'MyFy - One place for all your finances.';
  
  openTab(){
    openTab();
  }
}
