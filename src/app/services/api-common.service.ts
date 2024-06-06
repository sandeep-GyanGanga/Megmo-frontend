import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ApiCommonService {

  baseUrl = 'http://localhost:8080';

  TOKEN_HEADER = 'Aurthorization';

  constructor(public http: HttpClient, private loginService: LoginService) { }

  get(endpoint: string, params?: any): Observable<any> {
    let token = this.loginService.getToken();

    var headers = new HttpHeaders({
      "Authorization": 'Bearer ' + token
    });
    var options = { headers: headers };
    return this.http.get(this.baseUrl + endpoint, options)
  }


  post(endpoint: string, body: any): Observable<any> {
    let token = this.loginService.getToken();

    var headers = new HttpHeaders({
      "Authorization": 'Bearer ' + token
    });

    var options = { headers: headers };
    return this.http.post(this.baseUrl + endpoint, body, options)
  }

  put(endpoint: string, body: any): Observable<any> {

    let token = this.loginService.getToken();

    var headers = new HttpHeaders({
      "Authorization": 'Bearer ' + token
    });
    var options = { headers: headers };
    return this.http.put(this.baseUrl + endpoint, body, options)
  }

  delete(endpoint: string, params?: any): Observable<any> {
    let token = this.loginService.getToken();

    var headers = new HttpHeaders({
      "Authorization": 'Bearer ' + token
    });
    var options = { headers: headers };
    return this.http.delete(this.baseUrl + endpoint, options)
  }

  public getCurrentUser(): Observable<any> {

    var headers = new HttpHeaders({

    });

    const token = this.loginService.getToken();

    var options = { headers: headers };
    return this.http.get(this.baseUrl + '/current-user', options);


  }



}
// 38716021619