import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class GuestService {
  home:any = [{}];
  events:any = [{}];
  users:any = [{}];
  categorys:any = [{}];
  testimonials:any = [{}];
  user:any = {};
  selectedevent:any = {};
  services:any = [{}];
  contact:any = [{}]
  about:any = [{}]
  registersevent: any = [{}];
  totalPrice: any;
  reviews: any = [{}];

  constructor(private http: HttpClient , private toastr:ToastrService) { }

  // -------------------------------------------------------------- Events -----------------------------------------------------

  async getAllEvents() : Promise<any> {
    
    return  new Promise((resolve, reject) => {
     this.http.get('https://localhost:7043/api/Event').subscribe((res : any)=>{     
      resolve(res);     
      
      reject(false);
    })});
  }

  async getAllUserEvents() : Promise<any> {
    
    return  new Promise((resolve, reject) => {
     this.http.get('https://localhost:7043/api/UserReviewEvent').subscribe((res : any)=>{     
      resolve(res);     
      
      reject(false);
    })});
  }

  // -------------------------------------------------------------- Review -----------------------------------------------------


  async SendReview(body:any) : Promise<any> {
    
    return  new Promise((resolve, reject) => {
     this.http.post('https://localhost:7043/api/Review/CreateReview',body).subscribe((res : any)=>{
      resolve(res); 
            
      reject(false);
    })});
  }

  async getallReview() : Promise<any> {
    
    return  new Promise((resolve, reject) => {
     this.http.get('https://localhost:7043/api/Review').subscribe((res : any)=>{     
      resolve(res);     
      
      reject(false);
    })});
  }


  // -------------------------------------------------------------- Contact -----------------------------------------------------

  async createContact(body:any) : Promise<any> {
    const contact = {
      location: "null",
      phonenumber: "0",
    };
    const requestBody = {...contact,...body };
    return  new Promise((resolve, reject) => {
      this.http.post('https://localhost:7043/api/ContactUs',requestBody).subscribe((res)=>{     
      resolve(res);     
      
      reject(false);
    })});
  }

  async getallcontact() : Promise<any> {
    return  new Promise((resolve, reject) => {
   this.http.get('https://localhost:7043/api/ContactUs').subscribe((res : any)=>{
    resolve(res);     
  
    reject(false);
  })});
  }

    // -------------------------------------------------------------- Users -----------------------------------------------------

  async getuserall() : Promise<any> {
    
    return  new Promise((resolve, reject) => {
     this.http.get('https://localhost:7043/api/User').subscribe((res : any)=>{
      
      resolve(res);     

      reject(false);
    })});
  }



 async getUserBytoken() : Promise<any> {
    
  return  new Promise((resolve, reject) => {
    let us:any = localStorage.getItem('user');
    us = JSON.parse(us);
    
    resolve(this.users.find((u:any )=> u.username  == us.name));     

  })}


  // -------------------------------------------------------------- Category -----------------------------------------------------

  async getallcategory() : Promise<any> {
    return  new Promise((resolve, reject) => {

     this.http.get('https://localhost:7043/api/Category').subscribe((res : any)=>{
      
      resolve(res);     

      reject(false);
    })});
  }


    // -------------------------------------------------------------- testeimonial -----------------------------------------------------

  async SendTestimonial(body:any) : Promise<any> {
    
    return  new Promise((resolve, reject) => {
     this.http.post('https://localhost:7043/api/Testimonial',body).subscribe((res : any)=>{
      resolve(res);          
      reject(false);
    })});
  }
  
  async getalltestimonials() : Promise<any> {
    return  new Promise((resolve, reject) => {
   this.http.get('https://localhost:7043/api/Testimonial').subscribe((res : any)=>{
    
    resolve(res.filter((e:any )=> e.isaccepted == 1));     

    reject(false);
  })});
}

  // -------------------------------------------------------------- Dynamic Data Pages -----------------------------------------------------

  async getallHome() : Promise<any> {
    return  new Promise((resolve, reject) => {

     this.http.get('https://localhost:7043/api/Home').subscribe((res : any)=>{
      this.home = res;
      resolve(this.home);     

      reject(false);
    })});
  }


  async getallServices() : Promise<any> {
    return  new Promise((resolve, reject) => {

     this.http.get('https://localhost:7043/api/Service').subscribe((res : any)=>{
      
      resolve(res);     

      reject(false);
    })});
  }


async getallabout() : Promise<any> {
  return  new Promise((resolve, reject) => {
 this.http.get('https://localhost:7043/api/AboutUs').subscribe((res : any)=>{

  resolve(res);     

  reject(false);
})});
}
//------------------------------------------------ pipes -------------------------------------------------------

getEveneReport(){
  this.http.get('https://localhost:7043/api/Event').subscribe((resp: any) => {
    this.events = resp;   
    // Fetch user data for each testimonial
    this.events.forEach((event: any) => {
      if (event.categoryid) {
        this.getCategoryData(event.categoryid).subscribe((catData: any) => {
          // Assign the user's name to the testimonial
          event.category = catData;
          this.totalPrice += event.category.price;
        }, (err) => {
          console.log(err);
        });
      }
    });
  }, (err) => {
    console.log(err);
  });
 }
 
 getCategoryData(catId: number) {
  return this.http.get('https://localhost:7043/api/Category/GETBYID/' + catId);
  }

} 
