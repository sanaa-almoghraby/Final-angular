import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {finalize , debounceTime} from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinnerService: NgxSpinnerService) {}
  requestCount : any = 0;
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.requestCount++;
    this.spinnerService.show();

 return next.handle(request)
        .pipe(
            debounceTime(1000),
            finalize(() => {
                this.requestCount--;
                if (this.requestCount === 0) {
                  setTimeout( () => {
                    this.spinnerService.hide();
                  }, 1000 );
                }
            })
        );
  }
}