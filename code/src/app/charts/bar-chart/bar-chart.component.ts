import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../../services/database.service'; 
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { ChartsModule } from'ng2-charts';
import { Label } from 'ng2-charts';
import { Income} from '../../models/income.model';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: [ './bar-chart.component.css' ]
})
export class BarChartComponent implements OnInit{
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Housing', 'Expenses', 'Discretionary', 'Invest/Save', 'Debt'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public housingActual = 500;
  public expActual = 50;
  public discActual = 50;
  public investSaveActual = 50;
  public debtActual = 50;
  public housingTarget = 100;
  public expTarget = 100;
  public discTarget = 100;
  public investSaveTarget = 100;
  public debtTarget = 100;
  userID = "";
  

    public barChartData: ChartDataSets[] = [
      { data: [this.housingTarget, this.expTarget, this.discTarget, this.investSaveTarget, this.debtTarget], label: 'Target'},
      { data: [this.housingActual, this.expActual, this.discActual, this.investSaveActual, this.debtActual], label: 'Actual'}
    ];

  constructor(private dbService: DatabaseService, private router: Router) {
    //this.userID =storageID.setItem("ID",data[0]["ID"]);
   

    
   }

  ngOnInit() {    
    //make query call for user.invest whatever. 
    //Ask Jon
    // - done it in login and account setup.ts
    //- look at login.ts line 34-38 and sortingmethod below it. 
    //baseIncome = getUserIncome();
    //look at services. db,services.ts http services
  }
  getUserID(): void{
    let storageId = window.sessionStorage;
    this.userID = storageId.getItem("ID")!;
    //Maybe model/controllers for bar chart
    // - for entry in data
    //- check Brandon's code for functions
  }
}

