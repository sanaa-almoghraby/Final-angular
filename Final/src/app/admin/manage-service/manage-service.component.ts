import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { CreateServicesComponent } from '../create-services/create-services.component';

@Component({
  selector: 'app-manage-service',
  templateUrl: './manage-service.component.html',
  styleUrls: ['./manage-service.component.css']
})
export class ManageServiceComponent implements OnInit {

  constructor(public admin:AdminService,public dialog: MatDialog) { }

  updateForm:FormGroup=new FormGroup({
    servicesid:new FormControl('',Validators.required),
    image:new FormControl('',Validators.required),
    textt:new FormControl('',Validators.required),
   textp:new FormControl(''),
   textd:new FormControl('',Validators.required),
  });


  @ViewChild('callUpdateSer') callUpdateSer!:TemplateRef<any>
  @ViewChild('callDeleteDailog') callDeleteDailog!:TemplateRef<any>


  async ngOnInit(){
    await this.admin.getAllServices().then((data: any ) =>{
      this.admin.ServicesData = data;
    })
  }

  openCreateSer(){
    this.dialog.open(CreateServicesComponent);
  }
 
  p_data:any={};
  OPenUpdateSer(obj:any){
      this.p_data=obj;
      this.dialog.open(this.callUpdateSer); 
      this.updateForm.controls['servicesid'].setValue(this.p_data.servicesid);
    }



  openDeleteSer(id:number){
   const dialogRif= this.dialog.open(this.callDeleteDailog);
   dialogRif.afterClosed().subscribe((result)=>{
    if(result!=undefined){

        if(result=='yes')
   
            this.admin.DeleteServices(id);
         else if(result=='no')
   
         console.log("Thank you ");
    }
   })
  }

updatedSer(){
  this.admin.updateServices(this.updateForm.value);
}

  uploadImg(file:any){
    if(file.length ==0)
     return;
    let fileToUpload=<File> file[0];
    const formData =new FormData();
    formData.append('file',fileToUpload,fileToUpload.name);
    this.admin.uploadAttachmentServices(formData);
  }


}