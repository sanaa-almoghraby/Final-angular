import { Component, OnInit, ViewChild } from '@angular/core';
import { GuestService } from '../Services/guest.service';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
declare var $:any;
@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css']
})
export class EventInfoComponent implements OnInit {
  constructor(public guest:GuestService , private router:Router , public us:UserService){}
  data : any;
  user : any = {};
  Address : any = {};
  markerPositions: google.maps.LatLngLiteral[] = [];
  latitude : any;
  longitude : any;
  center: google.maps.LatLngLiteral = {
    lat: 31.71896521104641,
    lng: 35.96411664268798
  };
  zoom = 8;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };
  locationdata : any = {};
  check:any ;
  checkrole:any ;
  async checkuser() : Promise<any>{
    
    return new Promise((resolve, reject) => {
    const token = localStorage.getItem('token');
    console.log(token);
    if(token != null) 
    {
      resolve(true);

    }
    else resolve(false); 
  
  });
}

async checkRole(): Promise<any>{
  return new Promise((resolve, reject) => {
   console.log("check : ", this.check);
   console.log("role check : " , this.user.roleid)
  if(this.user.roleid == 2)
  resolve(true);
  else resolve(false); 
});
}

  async ngOnInit(){
    if(this.guest.selectedevent.username != null)
    {
    this.data = this.guest.selectedevent;
    await this.getdata(this.data.event.address);
    console.log("selected : " , this.guest.selectedevent);
    console.log("Address : " , this.data.event.address);
    }
    else
    {
    this.router.navigate(['events']);
    }
    await this.us.getDataLocation(this.latitude,this.longitude).then(async data => {   
      this.locationdata =  data;
      console.log("location data is : " , this.locationdata );
     });
    await this.guest.getAllUserEvents().then(async data => {   
      this.guest.registersevent =  data;
     });

     await this.guest.getuserall().then(async data => {
      console.log("data is : " , data);
      this.guest.users =  data;
      if (this.guest.users !== null) {
        this.user = await this.guest.getUserBytoken();
      }
     });




     this.check = await this.checkuser();
     if(this.check)
     this.checkrole = await this.checkRole();






     $(function () {
      $('.navbar-toggler').click(function () {
        $('body').toggleClass('noscroll');
      })
    });
    $(window).on("scroll", function () {
      var scroll = $(window).scrollTop();
  
      if (scroll >= 80) {
        $("#site-header").addClass("nav-fixed");
      } else {
        $("#site-header").removeClass("nav-fixed");
      }
    });
  
    //Main navigation Active Class Add Remove
    $(".navbar-toggler").on("click", function () {
      $("header").toggleClass("active");
    });
    $(document).on("ready", function () {
      if ($(window).width() > 991) {
        $("header").removeClass("active");
      }
      $(window).on("resize", function () {
        if ($(window).width() > 991) {
          $("header").removeClass("active");
        }
      });
    }); 

  }


  getattendens(nums:any,id:any) : number{ 

    let num =  this.guest.registersevent.filter((r:any )=> r.eventid == id).length;
    return nums - num;
  }

  checkregisteruser(eventid:any) : boolean{
    let num =  this.guest.registersevent.filter((r:any )=> r.eventid == eventid && r.userid == this.user.userid).length;
    
    if(num != 0)
      return true;
    else
      return false;
  }

  async createRegister(id:any){
    let data = {
      eventid : id ,
      userid : this.user.userid
    }
    await this.us.createRegister(data);
  }

  async DeleteRegister(id:any){
    const userregestirevent = this.guest.registersevent.find((ue:any) => ue.eventid == id && ue.userid == this.user.userid);
    console.log("userregestirevent : " , userregestirevent);
    await this.us.deleteRegister(userregestirevent.usereventid);
  }


  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  
  // addMarker(event: google.maps.MapMouseEvent) {
  //     if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  // }
  addMarkerByCoordinates(latitude: number, longitude: number) {
    const position: google.maps.LatLngLiteral = {
      lat: latitude,
      lng: longitude
    };
    this.markerPositions.push(position );
  }
  openInfoWindow(marker: MapMarker) {
      if (this.infoWindow != undefined) this.infoWindow.open(marker);
  }
  

  async getdata(string:string){
        const latIndex = string.indexOf("Lat:") + "Lat:".length;
        const lngIndex = string.indexOf("Lng:") + "Lng:".length;

         this.latitude = parseFloat(string.substring(latIndex, string.indexOf("/")));
         this.longitude = parseFloat(string.substring(lngIndex));
         console.log("lat : " , this.latitude , "long : " , this.longitude)

         this.center = {
          lat: this.latitude,
          lng: this.longitude
         }

         this.addMarkerByCoordinates(this.latitude,this.longitude);
       }

}
