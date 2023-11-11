import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GuestService } from '../Services/guest.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {
  constructor(public guest:GuestService){}
  @Input() event: any|undefined;
  @Input() categoryname : any|undefined;
  @Input() userimage :any|undefined;
  @Input() username :any|undefined;

  @Output() openInfo=new EventEmitter(); 

  showInfo(){
    this.guest.selectedevent = {
      event : this.event ,
      categoryname : this.categoryname ,
      userimage : this.userimage ,
      username : this.username
    }
    
    this.openInfo.emit();
  }

  
}
