import { Component , OnInit} from '@angular/core';
import { GuestService } from 'src/app/Services/guest.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit { 
  constructor(public guest:GuestService){}
  con : any = {};
  async ngOnInit() {
    await this.guest.getallcontact().then( data => {
      this.guest.contact =  data;
      this.con = data.find((e:any)=> e.contactusid == 1);
     });
  } 

}
