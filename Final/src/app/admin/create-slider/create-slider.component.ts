import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-create-slider',
  templateUrl: './create-slider.component.html',
  styleUrls: ['./create-slider.component.css']
})
export class CreateSliderComponent {
  constructor(
    private admin: AdminService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  createSlier: FormGroup = new FormGroup({
    image:new FormControl(''),
    textt:new FormControl('',Validators.required),
    textp:new FormControl('',Validators.required),
  });

  async createSlider() {
    let obj = {
    image: this.createSlier.controls['image'].value ,
    textd:"test",
    textt: this.createSlier.controls['textt'].value ,
    textp:  this.createSlier.controls['textp'].value ,
    text4:"",
    text5:"",
    text6:""
    }


    await this.admin.createslider(obj);

  }


  //////////////////create Image method
  UploadImage(file: any) {
    if (file.length == 0) return;

    let fileToUpload = <File>file[0];
    const formDate = new FormData();
    formDate.append('file', fileToUpload, fileToUpload.name);
    console.log(formDate);
    this.admin.uploadAttachmentSlider(formDate);
  }
}
