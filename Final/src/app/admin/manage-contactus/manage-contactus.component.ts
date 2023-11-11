import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GuestService } from 'src/app/Services/guest.service';
import { AdminRoutingModule } from '../admin-routing.module';
import { AdminService } from 'src/app/Services/admin.service';


@Component({
  selector: 'app-manage-contactus',
  templateUrl: './manage-contactus.component.html',
  styleUrls: ['./manage-contactus.component.css']
})
export class ManageContactusComponent implements OnInit {

  constructor(public admin:AdminService,public dialog: MatDialog) { }
  con : any = {};
  updateForm:FormGroup=new FormGroup({
    contactusid: new FormControl(),
    location:new FormControl('',Validators.required),
    phonenumber:new FormControl('',Validators.required),
    text1:new FormControl('',Validators.required),
    text2:new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    message:new FormControl(''),

  })

  @ViewChild('callUpdate') callUpdate!:TemplateRef<any>
  
  async ngOnInit() {
    await this.admin.getallcontact().then( data => {
      this.admin.contact =  data;
      this.con = data.find((e:any)=> e.contactusid == 1);
     });
  }

  p_data:any={};
  updateDailog(obj:any){
      this.p_data=obj;
      this.dialog.open(this.callUpdate)
      this.updateForm.controls['contactusid'].setValue(this.p_data.contactusid);
      this.updateForm.controls['message'].setValue("");
    }

    updateContactus(){
      console.log("Update Form : " , this.updateForm.value);
      this.admin.updateContactus(this.updateForm.value);
    }

    

}
