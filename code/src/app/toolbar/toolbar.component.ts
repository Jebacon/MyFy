import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
  <nav class="navbar is-dark">

      <!-- logo -->
      <div class="navbar-brand">
        <a class="navbar-item">
          <img src="assets/img/MyFyLogo.png">
        </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">
          About the team
        </a>
  
        <a class="navbar-item">
          Contact Us
        </a>
  
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More Options
          </a>
  
          <div class="navbar-dropdown">
            <a class="navbar-item">
              Who's it for
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item">
              Why MyFy
            </a>
          </div>
        </div>
      </div>
      <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
          <a href="./login.component.html">Log in</a>
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
  `,
  styles: []
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
