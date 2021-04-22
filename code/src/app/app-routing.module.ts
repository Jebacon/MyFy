import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsetupComponent } from './accountsetup/accountsetup.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { WhoIsItForComponent } from './who-is-it-for/who-is-it-for.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EducationComponent } from './education/education.component';
import { SettingsComponent } from './settings/settings.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { AnalyticsComponent } from './analytics/analytics.component'


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'toolbar', component: ToolbarComponent},
  { path: 'home', component: HomeComponent},
  { path: 'account-setup', component: AccountsetupComponent},
  { path: 'who-is-it-for', component: WhoIsItForComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'education', component: EducationComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'analytics', component: AnalyticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, ToolbarComponent, HomeComponent, AccountsetupComponent, WhoIsItForComponent, DashboardComponent, SettingsComponent]
