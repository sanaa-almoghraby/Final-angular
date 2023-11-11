import { Component , OnInit } from '@angular/core';
import 'owl.carousel';
import { GuestService } from '../Services/guest.service';
import { FormControl, Validators } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(public guest : GuestService ){}
    user:any = {} ;
    check:any ;
    checkrole:any ;
    checkreview:any ;
    tdata:any = {};
    review:number = 1;
    random:any ;
    message =  new FormControl("",Validators.required);

    getUserById (id:any) :  any { 
      return  this.guest.users.find((u:any )=> u.userid == id);
    }
  
    getcategorybyid(id:any) : any{ 
      return this.guest.categorys.find((c:any )=> c.categoryid == id);
    }

    async submitreview(){
      console.log("review value : " , this.review);
      const obj = {
        userid : this.user.userid,
        reviewvalue : this.review
      }
      await this.guest.SendReview(obj);
      window.location.reload();   
    }

    async checkReview() : Promise<any>{
      return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');        
        if(token != null) 
        {
         if(this.guest.reviews.filter( (re:any) => re.userid == this.user.userid).length != 0 || !this.checkrole  )
          resolve(false);
        else
        resolve(true); 
        }
        else resolve(true); 
      
      });
      
    }

    async checkuser() : Promise<any>{
    
      return new Promise((resolve, reject) => {
      const token = localStorage.getItem('token');
      console.log(token);
      if(token != null) 
      {
        resolve(true);

      }
      else resolve(false); 
    
    });
  }

  async checkRole(): Promise<any>{
    return new Promise((resolve, reject) => {
     console.log("check : ", this.check);
     console.log("role check : " , this.user.roleid)
    if(this.user.roleid == 2 || !this.check)
    resolve(true);
    else resolve(false); 
  });
  }
  
  async sendtestmonial(){
    this.tdata = {
      userid: this.user.userid ,
      message: this.message.value,
      isaccepted: 0 
    } 
    console.log("test " , this.tdata);
    await this.guest.SendTestimonial(this.tdata).then();
    window.location.reload();
  }


  async ngOnInit() {

    await this.guest.getallHome().then( data => {
      this.guest.home =  data;
     });

     await this.guest.getalltestimonials().then( data => {
      this.guest.testimonials =  data;
     });

     await this.checkuser().then(data => {
      this.check = data;
      console.log("check" , this.check);
     });

     await this.guest.getallcategory().then( data => {
      this.guest.categorys =  data;
     });
     
     await this.guest.getallReview().then( data => {
      this.guest.reviews =  data;
      console.log("this.guest.reviews " , this.guest.reviews);
     });
     
     await this.guest.getuserall().then( async data => {
        
      this.guest.users =  data;
      
      if (this.guest.users !== null && this.check) {
        this.user = await this.guest.getUserBytoken();
      }
     });
    
    await this.guest.getAllEvents().then( data => {
      this.guest.events =  data;
      this.random = Math.floor(Math.random() * (data.length - 2)) + 1 ;
     });

     
    
     await this.guest.getallServices().then( data => {
      this.guest.services =  data;
     });

     await this.checkRole().then(data => {
      this.checkrole = data;
      console.log("checkrole" , this.check);
     });
     
     await this.checkReview().then(data => {
      this.checkreview = data;
      console.log("checkrole" , this.checkreview);
     });

    $(document).ready(function () {
      $('.owl-one').owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        dots: false,
        responsiveClass: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplaySpeed: 1000,
        autoplayHoverPause: false,
        responsive: {
          0: {
            items: 1
          },
          480: {
            items: 1
          },
          667: {
            items: 1
          },
          1000: {
            items: 1,
            nav: true
          }
        }
      })
    }),
    $(document).ready(function () {
      $("#owl-demo1").owlCarousel({
          loop: true,
          margin: 20,
          nav: false,
          responsiveClass: true,
          autoplay: true,
          autoplayTimeout: 3000,
          autoplaySpeed: 1000,
          autoplayHoverPause: false,
          
      })
  }),
  $(function () {
    $('.navbar-toggler').click(function () {
      $('body').toggleClass('noscroll');
    })
  });
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 80) {
      $("#site-header").addClass("nav-fixed");
    } else {
      $("#site-header").removeClass("nav-fixed");
    }
  });

  //Main navigation Active Class Add Remove
  $(".navbar-toggler").on("click", function () {
    $("header").toggleClass("active");
  });
  $(document).on("ready", function () {
    if ($(window).width() > 991) {
      $("header").removeClass("active");
    }
    $(window).on("resize", function () {
      if ($(window).width() > 991) {
        $("header").removeClass("active");
      }
    });
  }); 

  

  }

}
