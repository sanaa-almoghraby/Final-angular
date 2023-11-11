import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactUsComponent } from './ContactUs/ContactUs.component';
import { EventsComponent } from './events/events.component';
import { authorizationGuard } from './authorization.guard';
import { EventInfoComponent } from './event-info/event-info.component';


const routes: Routes = [{
  path:'',
  component:HomeComponent
},
{
  path:'about',
  component:AboutusComponent
},{
  path:'contact',
  component:ContactUsComponent
},
{
  path:'events',
  component:EventsComponent
},
{
  path:'event-info',
  component:EventInfoComponent
},
{
  path:'security',
  loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
},
{
  path:'admin',
  loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule),
  canActivate:[authorizationGuard]
},
{
  path:'user',
  loadChildren:()=>import('./user/user.module').then(m=>m.UserModule),
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
