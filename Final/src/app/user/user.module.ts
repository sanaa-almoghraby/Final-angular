import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { CreateEventComponent } from './create-event/create-event.component';




@NgModule({
  declarations: [
    UpdateProfileComponent,
    CreateEventComponent,
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,  FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule,
    
  ]
})
export class UserModule { }

