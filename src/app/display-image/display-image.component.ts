import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatastoreService } from '../datastore.service';

@Component({
  selector: 'app-display-image',
  templateUrl: './display-image.component.html',
  styleUrls: ['./display-image.component.scss']
})
export class DisplayImageComponent implements OnInit {

  pageTitle:string = "Display Section";
  constructor(
    public datastore: DatastoreService
  ) { }

  ngOnInit(): void {
  }


  onItemClicked(index : number){
    this.datastore.removeItem(index);
  }


}
