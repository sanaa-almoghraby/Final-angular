import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GuestService } from 'src/app/Services/guest.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-manage-home',
  templateUrl: './manage-home.component.html',
  styleUrls: ['./manage-home.component.css']
})
export class ManageHomeComponent implements OnInit {

  constructor(public admin:AdminService,public dialog: MatDialog,private router:Router) { }

  updateForm:FormGroup=new FormGroup({
    homeid:new FormControl('',Validators.required),
    image:new FormControl('',Validators.required),
    textt:new FormControl('',Validators.required),
   textp:new FormControl('',Validators.required),
   text4:new FormControl('',Validators.required),
   text5:new FormControl(''),
   text6:new FormControl(''),
   textd:new FormControl('',Validators.required),
  })


  @ViewChild('callUpdate') callUpdate!:TemplateRef<any>

  home :any = {};

  async ngOnInit() {
    await this.admin.getAllHome().then((data:any)=>{
      this.admin.homeData = data;
      this.home = data.find((h : any) => h.homeid == 1 );
    });
  }
  p_data:any={};
  updateDailog(obj:any){
      this.p_data=obj;
      this.dialog.open(this.callUpdate)
      this.updateForm.controls['homeid'].setValue(this.p_data.homeid);
      this.updateForm.controls['image'].setValue(this.p_data.image);
      this.updateForm.controls['textt'].setValue(this.p_data.textt);
      this.updateForm.controls['textp'].setValue(this.p_data.textp);
    }

    updateHome(){
      this.admin.updateHome(this.updateForm.value);
    }

    uploadImg(file:any){
      if(file.length ==0)
       return  ;
      let fileToUpload=<File> file[0];
      const formData =new FormData();
      formData.append('file',fileToUpload,fileToUpload.name);
      this.admin.uploadAttachmentHome(formData);
    }

    gotoslider(){
      this.router.navigate(['admin/manageSlider']);
    }
}