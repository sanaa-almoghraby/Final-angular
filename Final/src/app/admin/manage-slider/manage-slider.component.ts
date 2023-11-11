import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { CreateSliderComponent } from '../create-slider/create-slider.component';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-slider',
  templateUrl: './manage-slider.component.html',
  styleUrls: ['./manage-slider.component.css']
})
export class ManageSliderComponent {
  constructor(public admin:AdminService,public dialog: MatDialog,private router:Router , private http: HttpClient,) {}

  updateForm:FormGroup=new FormGroup({
    homeid:new FormControl('',Validators.required),
    image:new FormControl('',Validators.required),
    textt:new FormControl('',Validators.required),
    textp:new FormControl('',Validators.required),
    textd:new FormControl('',Validators.required),
    text4:new FormControl('',Validators.required),
    text5:new FormControl('',Validators.required),
    text6:new FormControl('',Validators.required)
  })

  @ViewChild('callDeleteDailog') callDeleteDailog!: TemplateRef<any>;
  @ViewChild('callUpdate') callUpdate!:TemplateRef<any>

  async ngOnInit() {
    await this.admin.getAllHome().then((data:any)=>{
      this.admin.homeData = data;
    });
  }

  p_data:any={};
  updateDailog(obj:any){
      this.p_data=obj;
      this.dialog.open(this.callUpdate)
      this.updateForm.controls['homeid'].setValue(this.p_data.homeid);
      this.updateForm.controls['textd'].setValue(this.p_data.textd);
      this.updateForm.controls['text4'].setValue(this.p_data.text4);
      this.updateForm.controls['text5'].setValue(this.p_data.text5);
      this.updateForm.controls['text6'].setValue(this.p_data.text6);
    }

    updateHome(){
      console.log('update Form : ', this.updateForm.value);
      console.log('Image : ', this.admin.displayimgHome );
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

    openCreateSlider() {
      const dialogRef = this.dialog.open(CreateSliderComponent);
    }


    deleteSlider(id: number) {

      if(id != 1 )
      {
      this.http
        .delete('https://localhost:7043/api/Home/Delete/' + id)
        .subscribe(
          (resp: any) => {
            console.log('Deleted');
            Swal.fire({
              icon: 'success',
              title: 'Deleted',
              text: 'Deleted Successfuly'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })
            
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong',
            });
          }
        );  
      }
      else
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You cannot delete Base Slider!',
        });
      }
    }
  
    openDeleteSlider(id: number) {
      const dialogRef = this.dialog.open(this.callDeleteDailog);
      dialogRef.afterClosed().subscribe((result) => {
        if (result != undefined) {
          if (result == 'yes') this.deleteSlider(id);
          else if (result == 'no') console.log('Thank you');
        }
      });
    }
}
