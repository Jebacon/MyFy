import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountsetupComponent } from './accountsetup/accountsetup.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { IncomeComponent } from './income/income.component';
import { IncomeSourcesComponent } from './income-sources/income-sources.component';
import { HousingComponent } from './housing/housing.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeaminfoComponent } from './teaminfo/teaminfo.component';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { WhoIsItForComponent } from './who-is-it-for/who-is-it-for.component';
import { WhyMyFyComponent } from './why-my-fy/why-my-fy.component';
import { DashboardToolbarComponent } from './dashboard-toolbar/dashboard-toolbar.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

import { CardComponent } from './card/card.component';
import { DashComponent } from './dash/dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { EducationComponent } from './education/education.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    AccountsetupComponent,
    ExpensesComponent,
    IncomeComponent,
    IncomeSourcesComponent,
    HousingComponent,
    DashboardComponent,
    TeaminfoComponent,
    HousingComponent,
    ContactComponent,
    WhoIsItForComponent,
    WhyMyFyComponent,
    DashboardToolbarComponent,
    AssessmentComponent,
    CardComponent,
    DashComponent,
    BarChartComponent,
    EducationComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'accountsetup',
        component: AccountsetupComponent
      },
      {
        path: 'teaminfo',
        component: TeaminfoComponent
      },
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'account-setup',
        component: AccountsetupComponent
      },
      {

        path: 'dash', component: DashComponent

      },
      {
        path: 'contact',
        component : ContactComponent
      },
      {
        path : 'education',
        component: EducationComponent
      }
    ]),
    NoopAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
