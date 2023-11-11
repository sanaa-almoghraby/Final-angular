import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {

  constructor(private router: Router, public us: UserService, public dialog: MatDialog ) { }

  logout() {
    localStorage.clear();
    this.router.navigate(['security/login']);
  }
  img: any;
  user: any = {};
  check: any;
  userpass: any = {};
  duser: any;
  filterevents: any = [];
  event: any = {};
  eventsuser: any = [{}];
  eventcat: any = {};
  Address: string = "";
  latitude: any;
  longitude: any;
  visacard: any = {};
  updatevisa: any = {};
  lengtheventuser : any;

  async ngOnInit() {

    await this.us.getuserall().then(async data => {
      console.log("data is : ", data);
      this.us.users = data;
      if (this.us.users !== null) {
        this.user = await this.us.getUserBytoken();
        this.duser = this.user;
      }
    });
    await this.us.getAllEventsByUser(this.user.userid).then(async data => {
      console.log("data is eventsuser : ", data);
      this.eventsuser = data;
    });

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



    await this.us.getAllUserEvents().then(async data => {
      this.us.registersevent = data;

    });

    console.log("String : ", this.us.registersevent)
    this.img = this.user.image;


    await this.us.getAllEvents().then(async data => {
      this.filterevents = data.filter((e: any) => e.userid == this.user.userid);
      this.lengtheventuser = this.filterevents.length;
    });

    await this.us.getallcategory().then(async data => {
      this.us.categorys = data;
    });

  }




  getcategorybyid(id: any): any {
    return this.us.categorys.find((c: any) => c.categoryid == id);
  }

  getattendens(nums: any, id: any): number {

    let num = this.us.registersevent.filter((r: any) => r.eventid == id).length;
    return nums - num;
  }

  //-------------------------------------------------------- User ----------------------------------------------------------


  @ViewChild('callDeleteUserDailog') callDeleteUser !: TemplateRef<any>

  deleteUser(id: number) {

    if(this.lengtheventuser == 0)
    {

    const dialogRef = this.dialog.open(this.callDeleteUser);

    dialogRef.afterClosed().subscribe(async (result) => {

      if (result != undefined) {

        if (result == 'yes'){

          await this.us.deleteUser(id);
          Swal.fire({
            icon: 'success',
            title: 'Goodbay',
            text: 'Thanks for used our website.'
          })
        }
        else if (result == 'no')

          console.log("Thank you");
      }
    })
  }
  else
  {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You cannot delete your account. You have events!',
    });
  } 
  }

  //-------------------------------------------------------- update Event ----------------------------------------------------------

  @ViewChild('callUpdateDailog') callUpdate !: TemplateRef<any>
  @ViewChild('callDelateDailog') callDelete !: TemplateRef<any>


  updateEvent: FormGroup = new FormGroup({
    eventid: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    startdate: new FormControl('', Validators.required),
    enddate: new FormControl('', Validators.required),
    limitattend: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl(''),
    categoryid: new FormControl(),
    isaccepted: new FormControl(),
    ispayed: new FormControl(),
    userid: new FormControl(),
  });

  async uploadImageEvent(file: any) {
    if (file.lenght == 0)
      return;

    let fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    await this.us.uploadAttachmentEvent(formData);

  }


  updateDialog(obj: any) {

    this.event = obj;
    console.log(this.event);
    this.dialog.open(this.callUpdate, { width: '1000px' });
    this.updateEvent.controls['eventid'].setValue(this.event.eventid);
    this.updateEvent.controls['address'].setValue(this.event.address);
    this.updateEvent.controls['categoryid'].setValue(this.event.categoryid);
    this.updateEvent.controls['isaccepted'].setValue(this.event.isaccepted);
    this.updateEvent.controls['ispayed'].setValue(this.event.ispayed);
    this.updateEvent.controls['userid'].setValue(this.event.userid);
    this.Address = this.event.address;
    this.getdata(this.Address)
    this.position = {
      lat: this.latitude,
      lng: this.longitude
    }

  }

  updateevent() {
    console.log("image : ", this.updateEvent.controls['image'].value.toString(), "display : ", this.us.displayimgevent);
    console.log("event : ", this.updateEvent.value);
    this.us.updateEvent(this.updateEvent.value);
  }


  deleteEvent(id: number) {

    const dialogRef = this.dialog.open(this.callDelete);

    dialogRef.afterClosed().subscribe((result) => {

      if (result != undefined) {

        if (result == 'yes')

          this.us.deleteEvent(id);

        else if (result == 'no')

          console.log("Thank you");

      }
    })
  }
  //-------------------------------------------------------- update Profile ----------------------------------------------------------

  updateprofile: FormGroup = new FormGroup({
    userid: new FormControl('', Validators.required),
    fullname: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    roleid: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required)
  });


  update() {

    this.us.displayimg = this.user.image;
    console.log("user in update : ", this.user);
    this.updateprofile.controls['userid'].setValue(this.user.userid);
    this.updateprofile.controls['roleid'].setValue(this.user.roleid);
    this.updateprofile.controls['password'].setValue(this.user.password);

  }
  async updateProfile() {

    let use: any = localStorage.getItem('user');
    use = JSON.parse(use);
    console.log("my value is : ", this.updateprofile.value)
    await this.us.updateProfile(this.updateprofile.value);
    window.location.reload();
  }

  async uploadImage(file: any) {
    if (file.lenght == 0)
      return;

    let fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    await this.us.uploadAttachment(formData);

  }

  checkmatchdata(): boolean {
    if (this.updateprofile.value == this.duser) {
      console.log("check : ", this.updateprofile.value);
      console.log("check duser : ", this.duser);
      return false;
    }
    else
      return true;
  }

  //-------------------------------------------------------- change Password ----------------------------------------------------------

  updatePassProfile: FormGroup = new FormGroup({
    password: new FormControl('', Validators.required),
    newpassword: new FormControl('', [Validators.minLength(8), Validators.required]),
    confirmNewpassword: new FormControl('',),
  });

  async changePass() {
    this.userpass = this.user;
    this.userpass.password = this.updatePassProfile.controls['newpassword'].value;
    this.us.updatePass(this.userpass);


  }


  matchPassword() {
    if (this.updatePassProfile.controls['newpassword'].value == this.updatePassProfile.controls['confirmNewpassword'].value)
      this.updatePassProfile.controls['confirmNewpassword'].setErrors(null);
    else
      this.updatePassProfile.controls['confirmNewpassword'].setErrors({ missMatch: true });
  }


  CorrectPassword() {
    if (this.updatePassProfile.controls['password'].value != this.user.password)
      this.updatePassProfile.controls['password'].setErrors({ notCorrect: true });
    else
      this.updatePassProfile.controls['password'].setErrors(null);
  }




  //-------------------------------------------------------- change User Name ----------------------------------------------------------


  userrname = new FormControl("", Validators.required);
  passwordd = new FormControl("", [Validators.required]);

  checkuser() {
    if (this.us.users.filter((u: any) => u.username == this.userrname.value?.toString()).length == 0)
      this.userrname.setErrors(null);
    else if (this.userrname.value == this.duser.username)
      this.userrname.setErrors({ sameUsernme: true });
    else
      this.userrname.setErrors({ invalidUsername: true });

    console.log(this.us.users.filter((u: any) => u.username == this.userrname.value?.toString()).length);
  }

  CorrectPasswordForUser() {

    if (this.passwordd.value != this.duser.password)
      this.passwordd.setErrors({ notCorrect: true });
    else
      this.passwordd.setErrors(null);

  }

  changeusername() {
    this.userpass = this.user;
    this.userpass.username = this.userrname.value;
    console.log("user name change : ", this.userpass);
    this.us.updatePass(this.userpass);
  }


  //-------------------------------------------------------- Location ----------------------------------------------------------


  currentMarkerPosition: google.maps.LatLngLiteral | null = null;
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 31.71896521104641,
    lng: 35.96411664268798
  };
  position: google.maps.LatLngLiteral = {
    lat: 31.71896521104641,
    lng: 35.96411664268798
  }
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  // addMarker(event: google.maps.MapMouseEvent) {
  //     if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.position = event.latLng.toJSON();
      this.markerPositions = [this.position];
      this.display = this.position;
      this.Address = "Lat:" + this.display.lat + "/Lng:" + this.display.lng;
    }
  }
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  async getdata(string: string) {
    const latIndex = string.indexOf("Lat:") + "Lat:".length;
    const lngIndex = string.indexOf("Lng:") + "Lng:".length;

    this.latitude = parseFloat(string.substring(latIndex, string.indexOf("/")));
    this.longitude = parseFloat(string.substring(lngIndex));
    console.log("lat : ", this.latitude, "long : ", this.longitude)

    this.center = {
      lat: this.latitude,
      lng: this.longitude
    }


  }

  //-------------------------------------------------------- Payment ----------------------------------------------------------

  //-------------------------------------------------------- Payment ----------------------------------------------------------

  visa: FormGroup = new FormGroup({
    visaid: new FormControl('', Validators.required),
    cardnumber: new FormControl('', Validators.required),
    cvv: new FormControl('', Validators.required),
    datam: new FormControl('', Validators.required),
    datay: new FormControl('', Validators.required),
    cardname: new FormControl('', Validators.required),
  });

  @ViewChild('callPaymentDialog') callpayment !: TemplateRef<any>
  visaDialog(obj: any) {
    this.event = obj;
    this.eventcat = this.getcategorybyid(this.event.categoryid);
    const dialogRef = this.dialog.open(this.callpayment);
  }

  async Proceed() {
    await this.us.getAllVisa().then(async data => {
      this.visacard = data.find((v: any) => v.cardnumber == this.visa.controls['cardnumber'].value)
      console.log("visa data : ", this.visacard)
    });
    this.updatevisa = this.visacard;
    const datestring = this.visacard.visadate;

    const month = (new Date(datestring)).getMonth() + 1;
    const year = (new Date(datestring)).getFullYear();


    console.log("year is ", year, " and month is : ", month);

    if (this.visacard.cvv == this.visa.controls['cvv'].value && this.visacard.cardname == this.visa.controls['cardname'].value
      && month == this.visa.controls['datam'].value && year == (this.visa.controls['datay'].value + 2000)) {
      if (this.visacard.balance > this.eventcat.price) {
        this.updatevisa.balance = this.updatevisa.balance - this.eventcat.price;
        this.event.ispayed = 1;


        console.log("visa data update : ", this.updatevisa);
        console.log("event data : ", this.event);

        const emaildata = {
          recipientEmail: this.user.email,
          subject: "Invoice Event For Share",
          message: `you paied For shared this Event ${this.event.name}`,
          price: this.eventcat.price,
          createdby: this.user.fullname,
          eventname: this.event.name
        };
        console.log("email data : ", emaildata);


        await this.us.SendEmail(emaildata);
        await this.us.updateVisa(this.updatevisa);
        this.us.updateEvent(this.event);
      }
      else
      {
        alert("your Balance Less than Price");
      }
    }
  }


}