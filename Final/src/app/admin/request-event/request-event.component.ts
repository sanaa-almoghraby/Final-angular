import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Resolve } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-request-event',
  templateUrl: './request-event.component.html',
  styleUrls: ['./request-event.component.css'],
})
export class RequestEventComponent {
  constructor(
    public admin: AdminService,
    private http: HttpClient,
    public dialog: MatDialog,
    public us:UserService
  ) {}
  @ViewChild('callDelateEvent') callDelateEvent!: TemplateRef<any>;

  _filterText: string = '';
  latitude : any;
  longitude : any;
  locationdata : any = {};
  checkdata : any ;
  async ngOnInit() {
    await this.admin.getAllEvents().then(data => {  
      this.admin.events = data.filter((e : any) => e.ispayed != 1);
      if(this.admin.events.length == 0)
      this.checkdata = true ;
      else
      this.checkdata = false ;
    });
    
    await this.admin.getallcategory().then(data => {
      this.admin.categorys = data;
    });

  }

  findcategory(id:any):any{
    return this.admin.categorys.find((item:any)=> item.categoryid ==id);
  }

  //////////////////update IsAccepted Testimonial

  updateIsAccepted(e: any , num : number) {
    // Define the new value for isaccepted (1 for accepted)
    const newValue = num;
    // Create an object with the updated property
    const updatedTes = { ...e, isaccepted: newValue };
    // Send an HTTP PUT request to update the database
    this.http
      .put('https://localhost:7043/api/Event/Update', updatedTes)
      .subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {
          // Handle errors (e.g., display an error message)
        }
      );
    
  }


  async getdata(string:string){
    const latIndex = string.indexOf("Lat:") + "Lat:".length;
    const lngIndex = string.indexOf("Lng:") + "Lng:".length;

     this.latitude = parseFloat(string.substring(latIndex, string.indexOf("/")));
     this.longitude = parseFloat(string.substring(lngIndex));

   }
   /*
   getlocationdata(string:string) : any{
    const obj =  this.Getlocation(string);
    return obj;
   }

   async Getlocation(string:string) : Promise<any>{

    return new Promise(async (resolve, reject)=>{
    await this.getdata(string);
    await this.us.getDataLocation(this.latitude,this.longitude).then(async data => {   
    resolve(data);
    console.log("location data is : " , data );
   });
  })
   }*/
}
