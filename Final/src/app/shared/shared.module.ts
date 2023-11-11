import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import{HttpClientModule}from  '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import {ToastrModule, ToastNoAnimation, ToastNoAnimationModule} from 'ngx-toastr'
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FilterDatePipe, FilterPipe } from '../Pipes/filter.pipe';
import { GoogleMapsModule } from '@angular/google-maps';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    FooterComponent,
    NavComponent,
    FilterDatePipe,
    FilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    ToastNoAnimation,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    GoogleMapsModule,
    MatSelectModule
  ],
  exports:[
    FooterComponent,
    NavComponent,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    ToastNoAnimationModule,
    ToastNoAnimation,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FilterDatePipe,
    FilterPipe,
    GoogleMapsModule,
    MatSelectModule
  ]
})
export class SharedModule { }
