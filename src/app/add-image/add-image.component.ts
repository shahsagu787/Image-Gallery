import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatastoreService } from '../datastore.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent implements OnInit {

  pageTitle:string = "Add new Image";
  constructor(
    private datastore: DatastoreService
  ) { }

  userNameCtrl: FormControl = new FormControl(null, [
    Validators.required
  ]);

  passwordCtrl: FormControl = new FormControl(null, [
    Validators.required
   
  ]);

  urlCtrl :  FormControl = new FormControl(null, [
    Validators.required
   
  ]);

  
  nameCtrl :  FormControl = new FormControl(null, [
    Validators.required
   
  ]);

  entryGroup: FormGroup = new FormGroup({
    
    userName: this.userNameCtrl,
    password: this.passwordCtrl
  })

  

  ngOnInit(): void {
  }

  showDiv:boolean = false;
  showForm: boolean = true;
  errorDiv: boolean = false;
  tempStr:String = "";
  tempResult:String = "";


  setValues(){
    this.tempResult = this.datastore.CheckPassword(this.userNameCtrl.value, this.passwordCtrl.value).toString();
    this.tempStr = this.passwordCtrl.value;
  }

  onSubmit(event: Event){
   if(this.entryGroup.valid){

    this.setValues();

   
    
    if(this.tempResult===this.tempStr.toString()){
      this.showDiv = true;
      //  console.log("Here true");
       this.showForm = false;
       console.log("Here false");
     }
     else{
     
      this.showForm = false;
      this.showDiv = false;
       
      this.errorDiv = true;
      
     }
   }
  }

  errorMethod(event: Event){
    this.errorDiv = false;
    (event.currentTarget as HTMLFormElement).reset();

  }

  AddImage(event: Event){
   if(this.urlCtrl.valid && this.nameCtrl.valid){
    this.datastore.AddImage(this.nameCtrl.value,this.urlCtrl.value,this.userNameCtrl.value);
    this.nameCtrl.setValue(null);
    this.urlCtrl.setValue(null);
   }
  }


  logOut(){
    this.showForm = true;
    this.showDiv = false;
    this.userNameCtrl.setValue(null);
    this.passwordCtrl.setValue(null);
  }


  setLocalImage(result : any){
    console.log(result.value);
    this.urlCtrl.setValue(result.value)
  }
}




