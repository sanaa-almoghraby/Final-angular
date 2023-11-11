import { Component, OnInit } from '@angular/core';
import { GuestService } from 'src/app/Services/guest.service';
import { resolve } from 'src/assets/admin/vendor/chart.js/helpers';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public guest:GuestService) { }
    
    user:any = {} ;
    check: any ;
    checkrole: any ;
    async ngOnInit() {
        
       await this.guest.getuserall().then( async data => {
        
        this.guest.users =  data;
        
        if (this.guest.users !== null) {
          this.user = await this.guest.getUserBytoken();
        }
       });
        /** spinner ends after 5 seconds */
        
       
      
     
     await this.checkuser().then(data => {
      this.check = data;
     });
     
    if(this.check){
     await this.checkRole().then(data => {
      this.checkrole = data;
     });
    }
      //this.user = this.guest.getUserById();
      console.log("This user values is : " , this.user);
        
      
   
  }

  async checkuser() : Promise<any>{
    
    return new Promise((resolve, reject) => {
    const token = localStorage.getItem('token');
    console.log(token);
    if(token) 
    resolve(true);
    
    else reject(false);  
  });
}

async checkRole() : Promise<any>{
    
  return new Promise((resolve, reject) => {
  let user:any = localStorage.getItem('user');
      user = JSON.parse(user);
  console.log(user);
  if(user.role == 1) 
  resolve(1);
  else 
  resolve(2); 
});
}

}
