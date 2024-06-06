import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErroInterceptorService {

  constructor(private notification: NotificationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        console.log("error handler");
        console.log("ErrorInterceptorService is working ");

        this.notification.showError(err.error.message);
        if (err instanceof HttpErrorResponse) {
          // if (err.status === 401) this.keycloak.logout();
        }
        return throwError(err);
      })
    )
  }
}
