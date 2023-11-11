import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public admin:AdminService , private router:Router) { }



    user : any = {};
    notification: any ;
    legnthmes : any ;
    async ngOnInit() {
      
     await this.admin.getuserall().then( data => {
      console.log("data is : " , data);
      this.admin.users =  data;
      if (this.admin.users !== null) {
        this.user = this.admin.getuser();
      }
     });

     await this.admin.getallcontact().then( data => {
      this.legnthmes = data.length - 1;
     });

      await this.setandupdatenotification();
    }


    //------------------------------------------ notification ---------------------------------------


  async setandupdatenotification(){
    
    let token = localStorage.getItem("not");
    console.log("number of notification is : " , this.legnthmes  , "    " ,token  );
    let len = String(this.legnthmes);
    if(token)
    {
      this.notification = localStorage.getItem("not");
    }
    else
    {
      localStorage.setItem("not" , len);
      this.notification = len;
    } 
  }

  goMessages(){
    localStorage.setItem("not" , "0");
    this.router.navigate(['/admin/messages']);
  }
}
