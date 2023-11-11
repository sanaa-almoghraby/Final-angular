import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.css'],
})
export class CategorysComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public admin: AdminService,
    public dialog: MatDialog
  ) {}
  @ViewChild('callDeleteDailog') callDeleteDailog!: TemplateRef<any>;
  @ViewChild('callUpdateCat') callUpdateCat!: TemplateRef<any>;
  @ViewChild('callDetailsCat') callDetailsCat!: TemplateRef<any>;

  async ngOnInit() {
    await this.admin.getallcategory().then( data => {
      this.admin.categorys =  data;
     });

    await this.admin.getAllEvents().then(data => {
      this.admin.events = data;
    });
  }

  getlengthevent(id:any) : any{
    return this.admin.events.filter((e:any) => e.categoryid == id).length;
  }


  deleteCat(id: number) {

    if(this.getlengthevent(id) == 0 )
    {
    this.http
      .delete('https://localhost:7043/api/Category/Delete/' + id)
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
        text: 'You cannot delete this Category. there is an events in this Category!',
      });
    }
  }

  openDeleteCat(id: number) {
    const dialogRef = this.dialog.open(this.callDeleteDailog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result == 'yes') this.deleteCat(id);
        else if (result == 'no') console.log('Thank you');
      }
    });
  }
  openCreateCat() {
    const dialogRef = this.dialog.open(CreateCategoryComponent);
  }
 

  //////////////////////Update category//////////
  
  ////////////
  UpdateCategoryForm: FormGroup = new FormGroup({
    categoryid: new FormControl(''),
    name: new FormControl(''),
    image: new FormControl(''),
    price: new FormControl(''),
  });
  ///////////////////////////////////////////////
  p_Data: any = {};

  OPenUpdateCat(cat: any) {
    this.p_Data = cat;

    this.UpdateCategoryForm.controls['categoryid'].setValue(this.p_Data.categoryid);
    this.dialog.open(this.callUpdateCat);
  }

  async updatedCat() {
     await this.admin.UpdateCategory(this.UpdateCategoryForm.value);
     window.location.reload();
  }

  UploadImage(file: any) {
    if (file.length == 0) return;

    let fileToUpload = <File>file[0];
    const formDate = new FormData();
    formDate.append('file', fileToUpload, fileToUpload.name);
    console.log(formDate);
    this.admin.uploadAttachmentCategory(formDate);
  }

  ///////get element by Id ///////////
  P_Data: any = {};

  GetByIdCat(id: number) {

    this.http.get('https://localhost:7043/api/Category/GETBYID/' + id)
      .subscribe(
        (data) => {
          // Store the retrieved data in p_Data
          this.P_Data = data;

          // Open the details dialog
          this.dialog.open(this.callDetailsCat);
        },
        (err) => {
          console.log(err);
        }
      );

  }

  OpenDetailsCat(id: number) {
    // Call the GetByIdCat function to fetch and display details
    this.GetByIdCat(id);
  }
}
