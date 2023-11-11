import { Component, OnInit } from '@angular/core';
import { GuestService } from '../Services/guest.service';
declare var $:any;
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor(public guest:GuestService) {}

  check:any;

  async ngOnInit() {

    await this.guest.getallabout().then( data => {
      
      this.guest.about =  data;
     });

     this.check = await this.checkuser();

    
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

}
