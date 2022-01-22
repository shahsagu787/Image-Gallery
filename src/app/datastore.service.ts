import { Injectable } from '@angular/core';

export interface ImageList{
  name:string;
  url: string;
  username: string;
}
@Injectable({
  providedIn: 'root'
})


export class DatastoreService {
  public Name: String = "";
  public Email: String = "";
  public Phone: String = "";
  public UserName: String = "";
  public Password: String = "";

  private windowObject: any = window as any;
  private webSqlDb: any;

  usernames: string[] = [];

  allImage: ImageList[] = [];

  constructor() {

    const savedImages = window.localStorage.getItem('images');

    if(savedImages !== null){
      this.allImage = JSON.parse(savedImages);
    }

    this.webSqlDb = this.windowObject.openDatabase('ImageGallery', '1.0', 'Conestoga', 1000000);
    
    this.webSqlDb.transaction((tx: any)=>{
      tx.executeSql('CREATE TABLE IF NOT EXISTS userData(id INTEGER PRIMARY KEY AUTOINCREMENT,'+
      'name VARCHAR(256), email VARCHAR(256), phone VARCHAR(256), username VARCHAR(256), password VARCHAR(256))',
      null,()=>{
        tx.executeSql('SELECT username FROM userData',null,(_tx:any,results:any)=>{
         for (let i = 0; i < results.rows.length; i++) {
           this.usernames.push(results.rows[i].username);
          
         }
        
      });
    });

    

  });
}

  AddUser(){
    this.webSqlDb.transaction((tx: any)=>{
      tx.executeSql('INSERT INTO userData(name,email,phone,username,password)'+
      ' VALUES ("'+this.Name+'","'+this.Email+'","'+this.Phone+'","'+this.UserName+'","'+this.Password+'")');
    }); 

    
  }


  GetUsers(user: string){
    
    return this.usernames.includes(user); 
  }

  private tempPass: string = ""
  CheckPassword(user: string, pass: string) : string {
    this.webSqlDb.transaction((tx: any)=>{
      tx.executeSql('SELECT password FROM userData where username="'+user+'"',null,(_tx:any,results:any)=>{
        
        if(results.rows[0].password===pass){
          this.tempPass = results.rows[0].password;
        }
       
       
      }) ;
    
    }); 
    
   return this.tempPass;
  }

  removeItem(i:number){
    this.allImage.splice(i,1);
    window.localStorage.setItem('images',JSON.stringify(this.allImage));
  }


  AddImage(iname: string, iurl:string, iuser: string){
    this.allImage.push({name:iname,url:iurl, username:iuser});

    window.localStorage.setItem('images',JSON.stringify(this.allImage));
  }


  private tempEmail: string = "";
  getEmail(iuser: number) : string {
    this.webSqlDb.transaction((tx: any)=>{
      tx.executeSql('SELECT email FROM userData where username="'+this.allImage[iuser].username+'"',null,(_tx:any,results:any)=>{
       
          this.tempEmail = results.rows[0].email;
         
       
      }) ;
    
    }); 
    
   return this.tempEmail;
  }



}
