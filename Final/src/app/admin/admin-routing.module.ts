import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageHomeComponent } from './manage-home/manage-home.component';
import { ManageContactusComponent } from './manage-contactus/manage-contactus.component';
import { ManageTestimonialComponent } from './manage-testimonial/manage-testimonial.component';
import { ManageAboutusComponent } from './manage-aboutus/manage-aboutus.component';
import { UpdateProfileComponent } from './Update-profile/Update-profile.component';
import { DetailsOfUserComponent } from './detailsOfUser/detailsOfUser.component';
import { CategorysComponent } from './categorys/categorys.component';
import { EffectiveEventsComponent } from './effective-events/effective-events.component';
import { RequestEventComponent } from './request-event/request-event.component';
import { ReportsComponent } from './Reports/Reports.component';
import { ManageSliderComponent } from './manage-slider/manage-slider.component';
import { ManageServiceComponent } from './manage-service/manage-service.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'manageHome',
    component:ManageHomeComponent
  },
  {
    path:'manageContact',
    component:ManageContactusComponent
  },
  {
    path:'manageTestimonial',
    component:ManageTestimonialComponent
  },
  {
    path:'manageService',
    component:ManageServiceComponent
  },
  {
    path:'manageSlider',
    component:ManageSliderComponent
  },
  {
    path:'manageAbout',
    component:ManageAboutusComponent
  },
  {
    path:'messages',
    component:MessagesComponent
  },
  {
    path:'profile',
    component:UpdateProfileComponent
  },
  {
    path:'details',
    component:DetailsOfUserComponent
  },
  {
    path:'cat',
    component:CategorysComponent
  },
  {
    path:'reports',
    component:ReportsComponent
  },
  {
    path:'effectiveevents',
    component:EffectiveEventsComponent
  },
  {
    path:'Request',
    component:RequestEventComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
