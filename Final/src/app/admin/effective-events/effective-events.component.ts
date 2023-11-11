import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { GuestService } from 'src/app/Services/guest.service';


@Component({
  selector: 'app-effective-events',
  templateUrl: './effective-events.component.html',
  styleUrls: ['./effective-events.component.css']
})
export class EffectiveEventsComponent {
  constructor(public admin:AdminService) {}
  
  //  _StartDate:any='MM/dd/yyyy';
  _StartDate:any;
  _EndDate:any;
  
  async ngOnInit() {

    await this.admin.getAllEvents().then(data => {
      this.admin.events = data.filter((e:any) => e.ispayed == 1);
    });
    
    await this.admin.getallcategory().then(data => {
      this.admin.categorys = data;
    });

  }

  findcategory(id:any):any{
    return this.admin.categorys.find((item:any)=> item.categoryid ==id);
  }
}
