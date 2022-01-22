import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatastoreService } from '../datastore.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  pageTitle:string = "Register New User";

  nameCtrl: FormControl= new FormControl(null, [
    Validators.required,
    Validators.maxLength(15),
    Validators.pattern('[A-Za-z]+')
  ]);
  emailCtrl: FormControl = new FormControl(null, [
    Validators.required,
    Validators.email,
  ]);
  phoneCtrl: FormControl = new FormControl(null, [
    Validators.required,
    Validators.pattern('[1-9]{3}-[0-9]{3}-[0-9]{4}'),
  ]);

  userNameCtrl: FormControl = new FormControl(null, [
    Validators.required
  ]);

  passwordCtrl: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(16)
  ]);


  constructor(
    private datastore: DatastoreService
    ) { }


  entryGroup: FormGroup = new FormGroup({
    name: this.nameCtrl,
    email: this.emailCtrl,
    phone: this.phoneCtrl,
    userName: this.userNameCtrl,
    password: this.passwordCtrl
  })

  ngOnInit(): void {
  }

  isUser: boolean = false;
  onSubmit(event: Event){
    if(this.entryGroup.valid){
      this.isUser = false;
      this.datastore.Name = this.nameCtrl.value;
      this.datastore.Email = this.emailCtrl.value;
      this.datastore.Phone = this.phoneCtrl.value;
      this.datastore.UserName = this.userNameCtrl.value;
      this.datastore.Password = this.passwordCtrl.value;
      if(this.datastore.GetUsers(this.userNameCtrl.value)){
        console.log("user already");
        this.isUser = true;
      }else{
        console.log("new user");
        this.datastore.AddUser();
      }
      (event.currentTarget as HTMLFormElement).reset();
    }
    
  }

}
