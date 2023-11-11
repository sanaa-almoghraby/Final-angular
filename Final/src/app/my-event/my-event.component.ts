import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { GuestService } from 'src/app/Services/guest.service';
import { UserService } from '../Services/user.service';
declare var $:any;
@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.component.html',
  styleUrls: ['./my-event.component.css']
})
export class MyEventComponent implements OnInit {
  constructor(public guest : GuestService,private router:Router , public us:UserService){}

  _filterText:string = '';
  Address : any = {};
  markerPositions: google.maps.LatLngLiteral[] = [];
  latitude : any;
  longitude : any;
  eventsuser : any = [{}];
  user : any = {};
  center: google.maps.LatLngLiteral = {
    lat: 31.71896521104641,
    lng: 35.96411664268798
  };
  zoom = 7;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };

  async ngOnInit(){  
    await this.guest.getallcategory().then( data => {
      console.log("data is : " , data);
      this.guest.categorys =  data;
     });

     await this.guest.getuserall().then( async data => {
      console.log("data is : " , data);
      this.guest.users =  data;
      if (this.us.users !== null) {
        this.user = await this.us.getUserBytoken();
      }
     });
  
    await this.guest.getAllEvents().then( data => {
      console.log("data is : " , data);
      this.guest.events =  data.filter((e:any) => e.ispayed == 1);
     });

     await this.us.getAllEventsByUser(this.user.userid).then(async data => {
      console.log("data is eventsuser : ", data);
      this.eventsuser = data;
    });

     await this.getdata();
     console.log("Events : " , this.guest.events);

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

  goToinfo(){
    this.router.navigate(['event-info']);
  }

   getUserById (id:any) : any{ 
    return this.guest.users.find((u:any )=> u.userid == id);
  }

  getcategorybyid(id:any) : any{ 
    return this.guest.categorys.find((c:any )=> c.categoryid == id);
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
  

  async getdata(){
        for (const item of this.guest.events) {
            const string = item.address;
        
        const latIndex = string.indexOf("Lat:") + "Lat:".length;
        const lngIndex = string.indexOf("Lng:") + "Lng:".length;

         this.latitude = parseFloat(string.substring(latIndex, string.indexOf("/")));
         this.longitude = parseFloat(string.substring(lngIndex));
         console.log("lat : " , this.latitude , "long : " , this.longitude)

        
        
         this.addMarkerByCoordinates(this.latitude,this.longitude);
        }
       }

}