
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'toolbar', component: ToolbarComponent},
  { path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [LoginComponent, ToolbarComponent, HomeComponent]
=======
export const routingComponents = [LoginComponent]

