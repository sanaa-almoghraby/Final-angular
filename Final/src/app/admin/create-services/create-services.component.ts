import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-create-services',
  templateUrl: './create-services.component.html',
  styleUrls: ['./create-services.component.css']
})
export class CreateServicesComponent {
  constructor(private admin:AdminService){}
  createServices:FormGroup=new FormGroup({
    image:new FormControl('',Validators.required),
    textt:new FormControl('',Validators.required),
    textp:new FormControl('',Validators.required),
    textd:new FormControl('',Validators.required),
  })

  save(){
    
    this.admin.createServices(this.createServices.value);
  }

  uploadImg(file:any){
    if(file.length ==0)
     return  ;
    let fileToUpload=<File> file[0];
    const formData =new FormData();
    formData.append('file',fileToUpload,fileToUpload.name);
    this.admin.uploadAttachmentServices(formData);
  }    
}