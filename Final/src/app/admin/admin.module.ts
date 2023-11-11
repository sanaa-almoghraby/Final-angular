import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageHomeComponent } from './manage-home/manage-home.component';
import { ManageContactusComponent } from './manage-contactus/manage-contactus.component';
import { ManageTestimonialComponent } from './manage-testimonial/manage-testimonial.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ManageAboutusComponent } from './manage-aboutus/manage-aboutus.component';
import { UpdateProfileComponent } from './Update-profile/Update-profile.component';
import { DetailsOfUserComponent } from './detailsOfUser/detailsOfUser.component';
import { ReportsComponent } from './Reports/Reports.component';
import { CategorysComponent } from './categorys/categorys.component';
import { EffectiveEventsComponent } from './effective-events/effective-events.component';
import { RequestEventComponent } from './request-event/request-event.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { ManageSliderComponent } from './manage-slider/manage-slider.component';
import { ManageServiceComponent } from './manage-service/manage-service.component';
import { CreateServicesComponent } from './create-services/create-services.component';
import { NgChartsModule } from 'ng2-charts';
import { MessagesComponent } from './messages/messages.component';
import { CreateSliderComponent } from './create-slider/create-slider.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ManageHomeComponent,
    ManageAboutusComponent,
    ManageTestimonialComponent, 
    ManageContactusComponent,
    NavbarComponent,
    UpdateProfileComponent,
    DetailsOfUserComponent,
    ReportsComponent,
    CategorysComponent,
    EffectiveEventsComponent,
    RequestEventComponent,
    CreateCategoryComponent,
    ManageSliderComponent,
    ManageServiceComponent,
    CreateServicesComponent,
    MessagesComponent,
    CreateSliderComponent
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule, 
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule,
    NgChartsModule
  ]
})
export class AdminModule { }
