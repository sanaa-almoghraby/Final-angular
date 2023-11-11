import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { CreateEventComponent } from './create-event/create-event.component';

const routes: Routes = [{
  path:'edit',
  component:UpdateProfileComponent
},{
  path:'createEvent',
  component:CreateEventComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

