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
import { TeaminfoComponent } from './teaminfo/teaminfo.component';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { WhoIsItForComponent } from './who-is-it-for/who-is-it-for.component';
import { WhyMyFyComponent } from './why-my-fy/why-my-fy.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    AccountsetupComponent,
    ExpensesComponent,
    IncomeComponent,
    IncomeSourcesComponent,
    TeaminfoComponent,
    HousingComponent,
    ContactComponent,
    WhoIsItForComponent,
    WhyMyFyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
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
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'who-is-it-for',
        component: WhoIsItForComponent
      },
      {
        path: 'why-my-fy',
        component: WhyMyFyComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
