import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GuestService } from '../Services/guest.service';


declare var $: any;
@Component({
  selector: 'app-ContactUs',
  templateUrl: './ContactUs.component.html',
  styleUrls: ['./ContactUs.component.css']
})
export class ContactUsComponent implements OnInit {
  constructor(public guest: GuestService) { }
  con: any = {};
  check: any;
  checkrole: any;

  createContact: FormGroup = new FormGroup({

    text1: new FormControl('', Validators.required),
    text2: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required),

  })


  async createContactus() {
    await this.guest.createContact(this.createContact.value);
    await this.setandupdatenotification();
    window.location.reload();
  }

  async checkuser(): Promise<any> {

    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('token');

      if (token != null) {
        resolve(true);

      }
      else resolve(false);

    });
  }

  async checkRole(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.check) {

        let user: any = localStorage.getItem('user');
        user = JSON.parse(user);

        if (user.role == 2)

          resolve(true);

        else resolve(false);
      }
      else resolve(true);
    });
  }


  async ngOnInit() {



    await this.checkuser().then(data => {
      this.check = data;
      console.log("check", this.check);
    });

    await this.checkRole().then(data => {
      this.checkrole = data;
      console.log("checkrole", this.checkrole);
    });

    await this.guest.getallcontact().then(data => {
      this.guest.contact = data;
      this.con = data.find((e: any) => e.contactusid == 1);
    });



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


  //------------------------------------------ notification ---------------------------------------


  async setandupdatenotification() {
    let token = localStorage.getItem("not");
    let numNot;
    if (token) {
      numNot = Number(localStorage.getItem("not"));
      numNot = numNot + 1;
      const num = String(numNot);
      localStorage.setItem("not", num);
    }
    else {
      localStorage.setItem("not", "1");
    }
    console.log("number of notification is : ", numNot);
    
    let data = "2023" ;
    console.log(Number(data) + 1)
  }


}
