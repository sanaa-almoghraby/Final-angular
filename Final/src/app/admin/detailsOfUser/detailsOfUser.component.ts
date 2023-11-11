import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';




@Component({
  selector: 'app-detailsOfUser',
  templateUrl: './detailsOfUser.component.html',
  styleUrls: ['./detailsOfUser.component.css']
})
export class DetailsOfUserComponent implements OnInit {

  constructor(public admin:AdminService ,private http:HttpClient) { }
  // display_image:any; 

    usersactive:any = [{}];
  
    async ngOnInit() {
      await this.admin.getuserall().then( data => {
        this.usersactive =  data.filter((u:any) => u.roleid == 2 );
       });
  

      }


}
