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
    ownership: '',
    costs: '',
    userid: 0,
  };
  created = false;
  message = ""

  ngOnInit(): void {
  }
  addHousing(): void {
    this.housing.ownership = (document.getElementById("rentOwn") as HTMLInputElement).value
    this.housing.costs = (document.getElementById("costs") as HTMLInputElement).value
    this.housing.userid = this.housing.userid
    var data = "newHousing/"+this.housing.ownership+"&"+ this.housing.costs+"&"+ this.housing.userid
    this.dbService.post(data).subscribe(
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
   
  
  


