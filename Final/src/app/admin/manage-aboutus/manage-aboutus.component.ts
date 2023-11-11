import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GuestService } from 'src/app/Services/guest.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-manage-aboutus',
  templateUrl: './manage-aboutus.component.html',
  styleUrls: ['./manage-aboutus.component.css']
})
export class ManageAboutusComponent implements OnInit {

  constructor(public admin:AdminService,public dialog: MatDialog) { }
  
  updateForm:FormGroup=new FormGroup({
   imagepath:new FormControl('',Validators.required),
   image:new FormControl('',Validators.required),
   text1:new FormControl('',Validators.required),
   text2:new FormControl('',Validators.required),
   text3:new FormControl('',Validators.required),
   text4:new FormControl('',Validators.required),

  })


  @ViewChild('callUpdate') callUpdate!:TemplateRef<any>


  async ngOnInit() {
    
    await this.admin.getAboutus().then( data => {
      this.admin.AboutusData =  data[0];
     });
  }

  p_data:any={};
  updateDailog(obj:any){
      this.p_data=obj;
      this.dialog.open(this.callUpdate)
      this.updateForm.controls['id'].setValue(this.p_data.id)
    }


    updateAboutus(){
      console.log(this.updateForm.value ,"******************************");
      console.log(this.admin.displayimgAbout ,"display image 1");
      console.log(this.admin.displayimgAbout1 ,"display image 2");
      this.admin.updateAboutus(this.updateForm.value);
    }

    async uploadImg(file:any,num:any){
      if(file.length ==0)
       return  ;
      let fileToUpload=<File> file[0];
      const formData =new FormData();
      formData.append('file',fileToUpload,fileToUpload.name);
  
      if(num == 1)
      await this.admin.uploadAttachmentAbout(formData).then( data => {
        this.admin.displayimgAbout = data;
       });
       else
       await this.admin.uploadAttachmentAbout(formData).then( data => {
        this.admin.displayimgAbout1 = data;
       });
    }

}
