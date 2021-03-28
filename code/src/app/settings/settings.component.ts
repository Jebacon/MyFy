import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private dbService: DatabaseService) { }
  user: User = {
    id: "",
    fName: '',
    lName: '',
    email: '',
    password: '',
  };
  verification: User = {
    id: "null",
    fName: '',
    lName: '',
    email: '',
    password: '',
  }
  message = ""
  currentActive = "verifyDiv"
  currentActiveSub = ""
  verified = false

  ngOnInit(): void {
    let storage = window.sessionStorage;
    this.user.email = ""+storage.getItem("Email");
    storage.removeItem("V-ID")
    storage.removeItem("V-Email")
    storage.removeItem("V-Password")
  }

  async verifyStep(data?: string): Promise<void>{
    console.log("verify step")
    //once verification happens successfully the verification ID is no longer null and we wont ping the server to verify us endlessly
    if(this.verification.id == "null"){
      await this.verify()
    }
    var v_ID = (this.user.id == this.verification.id)
    var v_email = (this.user.email === this.verification.email)
    var v_password = (this.user.password === this.verification.password)
    console.log('ID: '+v_ID+'  EMAIL: '+v_email+'  PASSWORD: '+v_password)
    if(v_ID && v_email && v_password){
      console.log("verification success")
      var tabs = document.getElementById("settingsDiv")!;
      tabs.style.display = "block";
      this.toggleDiv(data!)
      this.message = ""
    } else {
      this.message = "Failed to verify credentials"
    }
  }

  async verify(): Promise<void>{
    let storageID = window.sessionStorage;
    this.user.id = storageID.getItem("ID")!;
    this.user.email = storageID.getItem("Email")!
    this.user.password = storageID.getItem("Password")!
    var dbData = this.dbService.post("login",{"email": (document.getElementById("verify-email") as HTMLInputElement).value, "password": (document.getElementById("verify-password") as HTMLInputElement).value})
      //pulls the data out of its object form for sorting
    await dbData.forEach(val => this.sort(val))
    }
    //sorts login data for ease of use
    sort(data:any): void{
      try{
      this.verification.id = data[0]["ID"];
      this.verification.email = data[0]["EMAIL"];
      this.verification.password = data[0]["PASSWORD"];
      console.log("verification assets")
      } catch (Error) {
      this.verified = false
      }
    }

  deleteAccount(): void {
    console.log("deleting account")
    var con = confirm("This will delete your account. Are you sure?")
    var dbData = this.dbService.delete("delete",{"email": (document.getElementById("deleteAccountVerify-email") as HTMLInputElement).value, "password": (document.getElementById("deleteAccountVerify-password") as HTMLInputElement).value})
    dbData.forEach(val => function(val:any): void{
      try{
        console.log(val)
        console.log("deletion Successful")
        } catch (Error) {
        console.log(Error)
        }
    })
    if(con){
      console.log("user deleted")
    } else {
      console.log("user deletion aborted")
    }
  }
  updateEmail(): void {
    console.log("Updating Email")
    var newEmail = (document.getElementById("changeEmail-newEmail") as HTMLInputElement).value
  }
  updatePassword(): void {
    console.log("Updating Password")
    var newPassword = (document.getElementById("changePassword-newPassword") as HTMLInputElement).value
  }
  updateName(): void {
    console.log("Updating Name")
    var newFname = (document.getElementById("changeName-newFName") as HTMLInputElement).value
    var newLname = (document.getElementById("changeName-newLName") as HTMLInputElement).value
  }
  //Handles toggling divs and setting values to be handled by other methods
  toggleDiv(data: string): void {
    if(data === this.currentActive){
      console.log("This option is already selected")
    } else {
      console.log(data)
      var a = document.getElementById(this.currentActive)!;
      a.style.display = "none";
      var b = document.getElementById(data)!;
      b.style.display = "block";
      let old = document.getElementById(this.currentActive);
      old!.className = ''
      this.currentActive = data
      this.currentActiveSub = data + "-Start"
      let active = document.getElementById(this.currentActive);
      active!.className = 'is-active'
    }
  }
}
