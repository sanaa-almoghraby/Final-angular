import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
declare var $:any;
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit {
  constructor(public us: UserService) {}

    user:any = {};
    Address: string =  "";
    latitude: any ;
    longitude: any;
  createEvent: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    startdate: new FormControl('', [Validators.required]),
    enddate: new FormControl('', [Validators.required]),
    limitattend: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    categoryid: new FormControl(),
    isaccepted: new FormControl(),
    ispayed: new FormControl(),
    userid:new FormControl(),
  });

  checkdate() {
    if(this.createEvent.controls['startdate'].value != "" && this.createEvent.controls['enddate'].value != "")
    {
    if (this.createEvent.controls['startdate'].value < this.createEvent.controls['enddate'].value)
      this.createEvent.controls['startdate'].setErrors(null);
    else
    this.createEvent.controls['startdate'].setErrors({ checkdate: true });
    }
  }

  async setvalue(){
    this.createEvent.controls['userid'].setValue(this.user.userid);
    this.createEvent.controls['isaccepted'].setValue(1);
    this.createEvent.controls['ispayed'].setValue(0);
    this.createEvent.controls['categoryid'].setValue(this.us.categorys[0].categoryid); 
  }
  

  async Create(){
    
    
    this.createEvent.controls['categoryid'].setValue( Number(this.createEvent.controls['categoryid'].value)); 
    console.log("form : " , this.createEvent.value);
    
    await this.us.createEvent(this.createEvent.value);
  }

  uploadImage(file: any) {
    if (file.length == 0) return;
    let fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.us.uploadAttachmentEvent(formData);
  }

//------------------------------------------------- ngOnInit ------------------------------------------------

  async ngOnInit() {
    await this.us.getallcategory().then(async data =>{
      this.us.categorys = data;
    });
    await this.us.getAllEvents().then(async data =>{
      this.us.events = data;
    });

    await this.us.getuserall().then(async data => {
      console.log("data is : " , data);
      this.us.users =  data;
      if (this.us.users !== null) {
        this.user = await this.us.getUserBytoken();
      }
     });

    await this.setvalue();

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

  currentMarkerPosition: google.maps.LatLngLiteral | null = null;
     display: any;
    center: google.maps.LatLngLiteral = {
      lat: 31.71896521104641,
      lng: 35.96411664268798
    };
    zoom = 4;
    markerOptions: google.maps.MarkerOptions = {
        draggable: false
    };
    markerPositions: google.maps.LatLngLiteral[] = [];
    // addMarker(event: google.maps.MapMouseEvent) {
    //     if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());

    addMarker(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) {
        this.currentMarkerPosition = event.latLng.toJSON();
        this.markerPositions = [this.currentMarkerPosition];
        this.display = this.currentMarkerPosition; 

        console.log(this.display.lat);
        this.Address = "Lat:" + this.display.lat + "/Lng:" + this.display.lng ; 
      }
    }
    moveMap(event: google.maps.MapMouseEvent) {
       if (event.latLng != null) this.center = (event.latLng.toJSON());
       }
       move(event: google.maps.MapMouseEvent) {
            if (event.latLng != null) this.display = event.latLng.toJSON();
       }

       
       
}
