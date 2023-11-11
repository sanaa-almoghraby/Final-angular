import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { GuestService } from 'src/app/Services/guest.service';
declare var $:any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public auth:AuthService, public guest:GuestService){}

  createUser:FormGroup=new FormGroup({

    fullname:new FormControl('',Validators.required),
    username:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    phone:new FormControl('',Validators.required),
    password:new FormControl('',[Validators.minLength(8) , Validators.required]),
    confirmpassword:new FormControl('',Validators.required),
    gender:new FormControl('',Validators.required),
    image:new FormControl(''),
    roleid:new FormControl('')

  })
  selectedRadio = 'male';
  matchPassword(){
    if(this.createUser.controls['password'].value ==  this.createUser.controls['confirmpassword'].value)
    this.createUser.controls['confirmpassword'].setErrors(null);
    else
      this.createUser.controls['confirmpassword'].setErrors({missMatch:true});
  }

   checkuser(){
    if( this.guest.users.filter((u:any )=> u.username ==  this.createUser.controls['username'].value.toString() ).length > 0 )
      this.createUser.controls['username'].setErrors({ invalidUsername: true});
    else
    this.createUser.controls['username'].setErrors(null);

    console.log(this.guest.users.filter((u:any )=> u.username ==  this.createUser.controls['username'].value.toString()).length);
  }

  checkemail(){
    if( this.guest.users.filter((u:any )=> u.email ==  this.createUser.controls['email'].value.toString() ).length > 0 )
      this.createUser.controls['email'].setErrors({ invalidEmail: true});
    else
    this.createUser.controls['email'].setErrors(null);

    console.log(this.guest.users.filter((u:any )=> u.username ==  this.createUser.controls['email'].value.toString()).length);
  }


  CreateUser(){
    console.log(this.createUser.value)
    this.createUser.controls['image'].setValue("user.png");
    this.createUser.controls['roleid'].setValue(2);
    delete this.createUser.value.confirmpassword;
    
    this.auth.createUser(this.createUser.value)
  }



  ngOnInit() {

    this.guest.getuserall();

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