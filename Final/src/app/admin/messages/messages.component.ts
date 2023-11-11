import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public admin:AdminService,public dialog: MatDialog) {}
  user : any = {};


  async ngOnInit(){

    await this.admin.getallcontact().then( data => {
      this.admin.contact = data;
     });

     await this.admin.getuserall().then( data => {
      console.log("data is : " , data);
      this.admin.users =  data;
      if (this.admin.users !== null) {
        this.user = this.admin.getuser();
      }
     });

      

  }

}

