import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable, finalize } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService {


  private requests: HttpRequest<any>[] = [];

  constructor(private ngxService: NgxUiLoaderService, private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.requests.length == 0) this.ngxService.start();
    this.requests.push(req);
    return next.handle(req).pipe(
      finalize(
        () => {
          this.requests.pop();
          if (this.requests.length == 0) this.ngxService.stop();
        }
      )
    )
  }

}
