import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { async } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(private http:HttpClient , private router:Router , private toastr:ToastrService) {}

  users:any = [{}];
  events: any = [{}];
  user:any = {} ;
  categorys:any = [{}]
  display_image :any;
  AboutusData : any = {};
  displayimgAbout : any;
  displayimgAbout1 : any;
  displayimgHome : any;
  displayimgService : any;
  displayimgSlider : any;
  contact : any = [{}];
  homeData : any = {};
  ServicesData : any = [{}];
  testimonials : any = [{}];
  async getuserall() : Promise<any> {
    
    return  new Promise((resolve, reject) => {
     this.http.get('https://localhost:7043/api/User').subscribe((res : any)=>{
      resolve(res);     

      reject(false);
    })});
  }  

  getuser() : any{ 
    let us:any = localStorage.getItem('user');
    us = JSON.parse(us);
    return  this.users.find((u:any )=> u.username  == us.name); 
 }

  
  displayimg : any ;
 
  async uploadAttachment(file : FormData ){
         this.http.post('https://localhost:7043/api/User/uploadImage',file).subscribe((resp:any)=>{        
        this.displayimg = resp.image;

        }, err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something wont wrong!',
          });
    });
  }



  async updateProfile(body: any) { 
    //hits Api (create function)
   

    if(this.displayimg != null)
    body.image = this.displayimg;
    
    this.http.put('https://localhost:7043/api/User/Update'
    , body).subscribe((resp: any) => 
    {
      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: 'Deleted Successfuly'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something wont wrong!',
      });
    });
   
  }

  async updatePass(body: any) { 
    //hits Api (create function)

    if(this.displayimg != null)
    body.image = this.displayimg;
    
    this.http.put('https://localhost:7043/api/User/Update'
    , body).subscribe((resp: any) =>
    {
      Swal.fire({
        icon: 'success',
        title: 'Updated',
        text: 'Updated Successfully'
      });
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something wont wrong!',
      });
    });
    localStorage.clear();
    this.router.navigate(['security/login']);

    

  }
  // ----------------------------------------------------------------------------------------------------
// ------------------------------------------------- Event ----------------------------------------------
// ----------------------------------------------------------------------------------------------------


async getAllEvents() : Promise<any> {
    
  return  new Promise((resolve, reject) => {
   this.http.get('https://localhost:7043/api/Event').subscribe((res : any)=>{     
    resolve(res);     
    
    reject(false);
  })});
}




// ----------------------------------------------------------------------------------------------------
// ------------------------------------------------- Category -----------------------------------------
// ----------------------------------------------------------------------------------------------------
  

  async getallcategory() : Promise<any> {
    
    return  new Promise((resolve, reject) => {
      this.http.get('https://localhost:7043/api/Category').subscribe((res : any)=>{     
      resolve(res);     
      
      reject(false);
    })});
  }


  
  async createCat(body: any) {
    body.image = this.display_image;
    this.http.post('https://localhost:7043/api/Category/', body).subscribe(
      (resp: any) => {   
        Swal.fire({
          icon: 'success',
          title: 'Created',
          text: 'Created Successfully'
        })   
        window.location.reload();
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

  async UpdateCategory(body: any) {
    // body.image = this.guest.display_image;
    if (this.display_image != null) 
    body.image = this.display_image;
    this.http.put('https://localhost:7043/api/Category/Update/', body)
      .subscribe(
        (resp: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Updated',
            text: 'Updated Successfully'
          });
          window.location.reload();
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



  async uploadAttachmentCategory(file : FormData ){
    await this.http.post('https://localhost:7043/api/Category/uploadImage',file).subscribe((resp:any)=>{        
    this.display_image = resp.image;   
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something wont wrong!',
      });
});
}

// ----------------------------------------------------------------------------------------------------
// ------------------------------------------------- About Us -----------------------------------------
// ----------------------------------------------------------------------------------------------------



async getAboutus() : Promise<any> {
    
  return  new Promise((resolve, reject) => {
    this.http.get('https://localhost:7043/api/AboutUs').subscribe((res : any)=>{     
    resolve(res);     
    
    reject(false);
  })});
}

updateAboutus(body:any){
  const aboutId = {
    id: this.AboutusData.id,
  };
    if(this.displayimgAbout != null)
    body.imagepath = this.displayimgAbout;

    if(this.displayimgAbout1 != null)
    body.image=this.displayimgAbout1;
    
  const requestBody = {...aboutId,...body };

  this.http.put('https://localhost:7043/api/AboutUs/Update',requestBody).subscribe((resp)=>{
    Swal.fire({
      icon: 'success',
      title: 'Deleted',
      text: 'Deleted Successfuly'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    })

  },err=>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something wont wrong!',
    });
  })
}

  async uploadAttachmentAbout(file:FormData) : Promise<any> {
    
    return  new Promise((resolve, reject) => {
      
        this.http.post('https://localhost:7043/api/AboutUs/uploadImage',file).subscribe((resp:any)=>{        
           
           resolve(resp.image);
        },err=>{
          alert('somthing wrong');
        });
      
})
}


// ----------------------------------------------------------------------------------------------------
// ------------------------------------------------- Contact Us ---------------------------------------
// ----------------------------------------------------------------------------------------------------


async getallcontact() : Promise<any> {
  return  new Promise((resolve, reject) => {
 this.http.get('https://localhost:7043/api/ContactUs').subscribe((res : any)=>{
  resolve(res);     

  reject(false);
})});
}

updateContactus(body:any){
  this.http.put('https://localhost:7043/api/ContactUs/Update',body).subscribe((resp)=>{
    alert('ok updated Sucessfully')
    window.location.reload();
  },err=>{
    alert(err.status);
  })
}

// ----------------------------------------------------------------------------------------------------
// ------------------------------------------------- Home ---------------------------------------
// ----------------------------------------------------------------------------------------------------
async getAllHome() : Promise<any> {
  return  new Promise((resolve, reject) => {
 this.http.get('https://localhost:7043/api/Home').subscribe((res : any)=>{
  resolve(res);     

  reject(false);
},err=>{
  console.log(err.status);
  console.log(err.message);
})});
}

updateHome(body:any){
  // body.imgname=this.display_image;

  if(this.displayimgHome != null)
  body.image = this.displayimgHome;

  this.http.put('https://localhost:7043/api/Home/Update',body).subscribe((resp)=>{
    alert('ok updated Sucessfully')
    window.location.reload();
  },err=>{
    alert(err.status);
  })
}

async uploadAttachmentHome(file : FormData ){
  this.http.post('https://localhost:7043/api/Home/uploadImage',file).subscribe((resp:any)=>{        
  this.displayimgHome = resp.image;   
  alert('Image added');
  }, err => {
  alert('Something Wont Wrong');
});
}


async uploadAttachmentSlider(file : FormData ){
  this.http.post('https://localhost:7043/api/Home/uploadImage',file).subscribe((resp:any)=>{        
  this.displayimgSlider = resp.image;   
  alert('Image added');
  }, err => {
  alert('Something Wont Wrong');
});
}

  async createslider(body:any){
  if(this.displayimgSlider != null)
  body.image =  this.displayimgSlider;

  else
  body.image = "logo.jpg";
  
  this.http.post('https://localhost:7043/api/Home',body).subscribe((resp:any)=>{        
    
  }, 
  err => {

});


}


// ----------------------------------------------------------------------------------------------------
// ------------------------------------------------- Services -----------------------------------------
// ----------------------------------------------------------------------------------------------------

createServices(body:any){
  if(this.displayimgService != null)
    body.image = this.displayimgService;
    this.http.post('https://localhost:7043/api/Service',body).subscribe((resp)=>{
      alert('Created Sucessfully');
      window.location.reload();
    },err=>{
      alert(err.status);
    })
}

async getAllServices() : Promise<any> {
  return  new Promise((resolve, reject) => {
 this.http.get('https://localhost:7043/api/Service').subscribe((res : any)=>{
  resolve(res);     

  reject(false);
},err=>{
  console.log(err.status);
  console.log(err.message);
})});
}

DeleteServices(id:number){
  this.http.delete('https://localhost:7043/api/Service/Delete/'+id).subscribe((resp:any)=>{
    alert('Deleted !');
    window.location.reload();
  },err=>{
    console.log(err);
  })}


  updateServices(body:any){

    if(this.displayimgService != null)
    body.image = this.displayimgService;
  
    this.http.put('https://localhost:7043/api/Service/Update',body).subscribe((resp)=>{
      alert('ok updated Sucessfully');
      window.location.reload();
    },err=>{
      alert(err.status);
    })
  }

  uploadAttachmentServices(file:FormData){
    this.http.post('https://localhost:7043/api/Service/uploadImage',file).subscribe((resp:any)=>{
      this.displayimgService = resp.image;
      console.log(resp);
    },err=>{
      alert('somthing wrong');
    })
  }

// ----------------------------------------------------------------------------------------------------
// ------------------------------------------------- Testimonial -----------------------------------------
// ----------------------------------------------------------------------------------------------------

  async getAllTestimonial() : Promise<any> {
    return  new Promise((resolve, reject) => {
   this.http.get('https://localhost:7043/api/Testimonial').subscribe((res : any)=>{
    resolve(res);     
  
    reject(false);
  },err=>{
    console.log(err.status);
    console.log(err.message);
  })});
  }


  deleteTestimonial(id:number){
    this.http.delete('https://localhost:7043/api/Testimonial/delete/'+id).subscribe((resp:any)=>{
      alert('Deleted !');
      window.location.reload();
    },err=>{
      console.log(err);
    })}

    updateIsAccepted(body:any){
      this.http.put('https://localhost:7043/api/Testimonial',body).subscribe((resp)=>{
        alert('ok updated Sucessfully');
        window.location.reload();
      },err=>{
        alert(err.status);
      })
    }


}