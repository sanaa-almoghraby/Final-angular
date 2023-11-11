import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient , private router:Router , private toastr:ToastrService) {}
  users: any = [{}];
  user: any = {};
  events: any = {};
  registersevent: any = [{}];
  displayimg: any;
  categorys:any = [{}];
  visaData:any = [{}]
  displayimgevent: any;
  // ------------------------------------------- user -------------------------------------------------
  async getuserall() : Promise<any> {
    
    return  new Promise((resolve, reject) => {
     this.http.get('https://localhost:7043/api/User').subscribe((res : any)=>{
      
      resolve(res);     

      reject(false);
    }
    )});
  }


    async getUserBytoken() : Promise<any> {
    
      return  new Promise((resolve, reject) => {
        let us:any = localStorage.getItem('user');
        us = JSON.parse(us);
        
        resolve(this.users.find((u:any )=> u.username  == us.name));     
    
      })}

    async deleteUser(id:number){
      this.http.delete('https://localhost:7043/api/User/Delete/'+id).subscribe((res : any)=>{
        localStorage.clear();
        this.router.navigate(['security/login']);
      },err=>{
        console.log(err);   
      });
    }

  // ------------------------------------------- Events -------------------------------------------------

    async getAllEvents() : Promise<any> {
    
      return  new Promise((resolve, reject) => {
       this.http.get('https://localhost:7043/api/Event').subscribe((res : any)=>{     
        resolve(res);     
        
        reject(false);
      })});
    }




    async createEvent(body: any) { 

      if(this.displayimgevent != null)   
      body.image = this.displayimgevent;
      else
      body.image = "logo.jpg";
    console.log("bogyyy : " , body);
    
      this.http.post('https://localhost:7043/api/Event/Create', body).subscribe(
        (resp) => {
          this.router.navigate(['user/edit']);
            this.toastr.success('Registerd Successfully','Success', {
              positionClass:'toast-bottom-center'})
        },
        (err) => {
          this.toastr.error('Somthing Wrong','Error', {
            positionClass:'toast-bottom-center'})
        }
      );
    }


    async getAllUserEvents() : Promise<any> {
    
      return  new Promise((resolve, reject) => {
       this.http.get('https://localhost:7043/api/UserReviewEvent').subscribe((res : any)=>{     
        resolve(res);     
        
        reject(false);
      })});
    }

    async getAllEventsByUser(id:number) : Promise<any> {
    
      return  new Promise((resolve, reject) => {
       this.http.get('https://localhost:7043/api/UserReviewEvent/geteventuser/' + id).subscribe((res : any)=>{     
        resolve(res);     
        
        reject(false);
      })});
    }

    async createRegister(body: any) {    
      
      this.http.post('https://localhost:7043/api/UserReviewEvent/CreateUevent', body).subscribe(
        (resp) => {
          
            this.router.navigate(['events']);
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Regeister Successfully'
            });
        },  
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something wont wrong!',
          });
        }
      );
    }

    async deleteRegister(id: any){
      this.http.delete('https://localhost:7043/api/UserReviewEvent/DeleteUevent/' + id).subscribe(
        (resp) => {
          
            this.router.navigate(['events']);
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Canceled Successfully'
              })
        },  
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something wont wrong!',
          });
        }
      );
    }



    async updateEvent(body: any) : Promise<any> {
    
      return  new Promise((resolve, reject) => {
    
        if(this.displayimgevent != null)
          body.image = this.displayimgevent;
    
       this.http.put('https://localhost:7043/api/Event/Update'
       , body).subscribe((resp: any) => 
       {
        
        resolve(resp);
        window.location.reload();
        this.toastr.success('Updated');
      }, err => {
      this.toastr.error('Something Wont Wrong');
      resolve(false);
       });     
    
      })}


      async deleteEvent(id:number){
        this.http.delete('https://localhost:7043/api/Event/Delete/'+id).subscribe((res : any)=>{
          alert("Deleted!")
          window.location.reload();
        },err=>{
          console.log(err);   
        });
      }

      async uploadAttachmentEvent(file : FormData ){
        await this.http.post('https://localhost:7043/api/Event/uploadImage',file).subscribe((resp:any)=>{        
        this.displayimgevent = resp.image;
        console.log(resp.image);
        this.toastr.success('Image added');
        }, err => {
        this.toastr.error('Something Wont Wrong');
    });
  }

  // ------------------------------------------- Category -------------------------------------------------


    async getallcategory() : Promise<any> {
      return  new Promise((resolve, reject) => {
  
       this.http.get('https://localhost:7043/api/Category').subscribe((res : any)=>{
        
        resolve(res);     
  
        reject(false);
      })});
    }


  // ------------------------------------------- Profile -------------------------------------------------



    async uploadAttachment(file : FormData ){
      await this.http.post('https://localhost:7043/api/User/uploadImage',file).subscribe((resp:any)=>{        
      this.displayimg = resp.image;
      console.log(resp.image);
      this.toastr.success('Image added');
      }, err => {
      this.toastr.error('Something Wont Wrong');
  });
}

  async updateProfile(body: any) : Promise<any> {
    
  return  new Promise((resolve, reject) => {

    if(this.displayimg != null)
      body.image = this.displayimg;

   this.http.put('https://localhost:7043/api/User/Update'
   , body).subscribe((resp: any) => 
   {
    this.toastr.success('Updated');
    resolve(resp);
  }, err => {
  this.toastr.error('Something Wont Wrong');
  resolve(false);
   });     

  })}
  
    async updatePass(body: any) { 
      //hits Api (create function)
      console.log("body = " , body)
  
      if(this.displayimg != null)
      body.image = this.displayimg;
      
      this.http.put('https://localhost:7043/api/User/Update'
      , body).subscribe((resp: any) =>
      {
      alert('Update Sucessfully');
      }, err => {
      alert('Something wont wrong');
      });
      localStorage.clear();
      this.router.navigate(['security/login']);
    }
  
     // ------------------------------------------- Loaction -------------------------------------------------

      getDataLocation(lat:any,lon:any): Promise<any> {
        return  new Promise((resolve, reject) => {
    
         this.http.get('https://localhost:7043/api/Geocoding?Latitude='+ lat +'&Longitude='+ lon).subscribe((res : any)=>{
          
          resolve(res);     
    
          reject(false);
        })});
      }

      // ------------------------------------------- Loaction -------------------------------------------------

      getAllVisa(): Promise<any> {
        return  new Promise((resolve, reject) => {
    
         this.http.get('https://localhost:7043/api/Visa').subscribe((res : any)=>{
          
          resolve(res);     
    
          reject(false);
        })});
      }

      async updateVisa(body: any) : Promise<any> {
    
        return  new Promise((resolve, reject) => {
      
         this.http.put('https://localhost:7043/api/Visa/Update'
         , body).subscribe((resp: any) => 
         {
          this.toastr.success('Proccessed');
          resolve(resp);
        }, err => {
        this.toastr.error('Something Wont Wrong');
        resolve(false);
         });     
      
        })}

        async SendEmail(body: any) : Promise<any> {
    
        return  new Promise((resolve, reject) => {
      
         this.http.post('https://localhost:7043/api/JWT/Send'
         , body).subscribe((resp: any) => 
         {
          this.toastr.success('Proccessed');
          resolve(resp);
        }, err => {
        this.toastr.error('Something Wont Wrong');
        resolve(false);
         });     
      
        })}
}
