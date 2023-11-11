import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { GuestService } from 'src/app/Services/guest.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent {
  constructor(
    private admin: AdminService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  createCategory: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  async createCat() {

    this.createCategory.controls['price'].setValue(Number(this.createCategory.controls['price'].value));
    console.log(this.createCategory.value);
    await this.admin.createCat(this.createCategory.value);

  }


  //////////////////create Image method
  UploadImage(file: any) {
    if (file.length == 0) return;

    let fileToUpload = <File>file[0];
    const formDate = new FormData();
    formDate.append('file', fileToUpload, fileToUpload.name);
    console.log(formDate);
    this.admin.uploadAttachmentCategory(formDate);
  }
}
