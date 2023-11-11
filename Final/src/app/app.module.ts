import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactUsComponent } from './ContactUs/ContactUs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventsComponent } from './events/events.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { EventInfoComponent } from './event-info/event-info.component';
import { SpinnerInterceptor } from './interceptor/spinner.interceptor';
import { EventCardComponent } from './event-card/event-card.component';
import { MyEventComponent } from './my-event/my-event.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutusComponent,
    ContactUsComponent,
    EventsComponent,
    EventInfoComponent,
    EventCardComponent,
    MyEventComponent

    
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule, BrowserAnimationsModule,NgxSpinnerModule.forRoot({ type:'line-scale-pulse-out'}),FormsModule,ReactiveFormsModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: SpinnerInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
