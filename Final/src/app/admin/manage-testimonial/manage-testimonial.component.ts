import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';


@Component({
  selector: 'app-manage-testimonial',
  templateUrl: './manage-testimonial.component.html',
  styleUrls: ['./manage-testimonial.component.css']
})
export class ManageTestimonialComponent implements OnInit {

  constructor(
    public admin: AdminService,
    public dialog: MatDialog
  ) { }
  @ViewChild('callDelateTestimonial') callDelateTestimonial!: TemplateRef<any>;

  checkdata : any;

  async ngOnInit() {
    await this.admin.getAllTestimonial().then((data: any) => {
      this.admin.testimonials = data.filter((t: any) => t.isaccepted == 0);
      if(this.admin.testimonials.length == 0)
      this.checkdata = true ;
      else
      this.checkdata = false ;
    });

    await this.admin.getuserall().then((data: any) => {
      this.admin.users = data;
    });

  }

  getuser(id: number): any {
    return this.admin.users.find((u: any) => u.userid == id);
  }


  updateIsAccepted(tes: any) {
    const updatedTes = { ...tes, isaccepted: 1 };
    this.admin.updateIsAccepted(updatedTes);
  }


  // openDeleteDailog(tes:number){}
  openDeleteDailog(id: number) {
    const dialogRef = this.dialog.open(this.callDelateTestimonial);
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result == 'yes') this.admin.deleteTestimonial(id);
        else if (result == 'no') console.log('Thank you');
      }
    });
  }
}
