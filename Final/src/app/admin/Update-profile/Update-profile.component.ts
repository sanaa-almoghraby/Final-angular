import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';


@Component({
  selector: 'app-Update-profile',
  templateUrl: './Update-profile.component.html',
  styleUrls: ['./Update-profile.component.css']
})

export class UpdateProfileComponent implements OnInit {

  constructor(public admin:AdminService , private router:Router) { }

  img: any ;
  user : any = {};
  check:any ;
  userpass : any = {};  
  duser : any ;

  

async ngOnInit() {
  
  await this.admin.getuserall().then( data => {
    console.log("data is : " , data);
    this.admin.users =  data;
    if (this.admin.users !== null) {
      this.user = this.admin.getuser();
      this.duser = this.user;
    }
   });

  console.log("String" , this.user  )
  this.img= this.user.image ; 
}


//-------------------------------------------------------- update Profile ----------------------------------------------------------

  updateprofile:FormGroup = new FormGroup({
  userid:new FormControl('' ),
  fullname:new FormControl('' , Validators.required),
  username:new FormControl('' , Validators.required),
  email:new FormControl('' , Validators.required ),
  password:new FormControl(''  ),
  gender :new FormControl(''  ),
  roleid : new FormControl(''),
  image:new FormControl('' ),
  phone: new FormControl('' , Validators.required )
});


update(){  

  this.admin.displayimg = this.user.image;
  
  
   this.updateprofile.controls['userid'].setValue(this.user.userid);
   this.updateprofile.controls['roleid'].setValue(this.user.roleid);
   this.updateprofile.controls['password'].setValue(this.user.password);
   
}
 async updateProfile(){
  
  let us:any = localStorage.getItem('user');
  us = JSON.parse(us);
    if(this.updateprofile.controls['username'].value == us.name)
    this.admin.updateProfile(this.updateprofile.value);
    else
    this.admin.updatePass(this.updateprofile.value);
    
}

async uploadImage(file:any){
  if(file.lenght == 0)
    return ; 
  
  let fileToUpload = <File> file[0];
  const formData = new FormData();
  formData.append('file',fileToUpload,fileToUpload.name);
  await this.admin.uploadAttachment(formData ); 
    
}

checkmatchdata() : boolean{
  if(this.updateprofile.value == this.duser)
  {
      console.log("check : " , this.updateprofile.value);
      console.log("check duser : ", this.duser);
     return false;
  }
    else
  return true;
}

//-------------------------------------------------------- change Password ----------------------------------------------------------

updatePassProfile:FormGroup = new FormGroup({
  password:new FormControl('',Validators.required),
  newpassword:new FormControl('' , [Validators.minLength(8) , Validators.required] ),
  confirmNewpassword:new FormControl('' ,),
});

 async changePass(){  
   this.userpass = this.user;
   this.userpass.password =  this.updatePassProfile.controls['newpassword'].value;
   console.log("user pass : " , this.userpass);
   this.admin.updatePass(this.userpass);
   
   
}



setchangePass(){  

  console.log(this.user);
   this.updatePassProfile.controls['userid'].setValue(this.user.userid);
   this.updatePassProfile.controls['fullname'].setValue(this.user.fullname);
   this.updatePassProfile.controls['username'].setValue(this.user.username);
   this.updatePassProfile.controls['email'].setValue(this.user.email);
   this.updatePassProfile.controls['phone'].setValue(this.user.phone);
   this.updatePassProfile.controls['roleid'].setValue(this.user.roleid);
   this.updatePassProfile.controls['gender'].setValue(this.user.gender);
   this.updatePassProfile.controls['image'].setValue(this.user.image);
   
}

matchPassword(){
  if(this.updatePassProfile.controls['newpassword'].value ==  this.updatePassProfile.controls['confirmNewpassword'].value)
  this.updatePassProfile.controls['confirmNewpassword'].setErrors(null);
  else
    this.updatePassProfile.controls['confirmNewpassword'].setErrors({missMatch:true});
}


CorrectPassword(){

  if(this.updatePassProfile.controls['password'].value != this.user.password)
  this.updatePassProfile.controls['password'].setErrors({notCorrect:true});
  else
  this.updatePassProfile.controls['password'].setErrors(null);
}




//-------------------------------------------------------- change User Name ----------------------------------------------------------
userrname = new FormControl("",Validators.required);
passwordd = new FormControl("",[Validators.required]); 

checkuser(){
  if( this.admin.users.filter((u:any )=> u.username ==  this.userrname.value?.toString() ).length == 0  )
   this.userrname.setErrors(null);   
   else if(this.userrname.value == this.duser.username)
   this.userrname.setErrors({ sameUsernme: true});
  else
  this.userrname.setErrors({ invalidUsername: true});

  console.log(this.admin.users.filter((u:any )=> u.username ==  this.userrname.value?.toString()).length);
}

CorrectPasswordForUser(){

  if(this.passwordd.value != this.duser.password)
  this.passwordd.setErrors({notCorrect:true});
  else
  this.passwordd.setErrors(null);
}

changeusername(){
  this.userpass = this.user;
   this.userpass.username =  this.userrname.value;
   console.log("user name change : " , this.userpass);
   this.admin.updatePass(this.userpass);
}

}
