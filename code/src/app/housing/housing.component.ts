import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { User } from '../models/user.model'
import { Housing } from '../models/housing.model'
import { isNull } from '@angular/compiler/src/output/output_ast';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrls: ['./housing.component.css']
})
export class HousingComponent implements OnInit {

  constructor(private dbService: DatabaseService) { }

  housing: Housing = {
    OWNERSHIP: '',
    COSTS: 0,
    USERID: 0,
  };
  created = false;
  message = ""

  ngOnInit(): void {
  }
  addHousing(): void {
    this.housing.OWNERSHIP = (document.getElementById("rentOwn") as HTMLInputElement).value
    this.housing.COSTS = (document.getElementById("costs") as HTMLInputElement).valueAsNumber
    this.housing.USERID = this.housing.USERID  
    var data = this.housing.OWNERSHIP+"&"+ this.housing.COSTS+"&"+ this.housing.USERID
    var dbData = this.dbService.post("newHousing", {data}).subscribe(
      response => {
        if(response === null){
          this.message = "Unable to add housing expense entry at this time"
        }else{
          this.message = "Housing expense entry added"
          console.log("Housing expense added YAY!")
          this.created = true;
        }
        },
        error =>{
          console.log("error", error)
          console.log(error)
        });
      }
    }
   
  
  


