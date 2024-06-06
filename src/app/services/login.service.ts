import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = 'http://localhost:8080';

  public loginStatusSubject = new Subject<boolean>();


  constructor(public http: HttpClient, private router: Router) { }



  // to get login user details using jwt token
  public getCurrentUser(): Observable<any> {

    let token = this.getToken();
    console.log("token is in loing service is ", token);
    var headers = new HttpHeaders({
      "Authorization": 'Bearer ' + token
    });

    var options = { headers: headers };
    return this.http.get(this.baseUrl + '/current-user', options);
  }

  // to generate token 
  generateToken(endpoint: string, body: any): Observable<any> {
    var headers = new HttpHeaders({

    });
    var options = { headers: headers };
    return this.http.post(this.baseUrl + endpoint, body)
  }

  // saving token in local storage
  public loginUser(token: any) {

    localStorage.setItem('token', token);
    // this.loginStatusSubject.next(true);
    return true;

  }
  // agar token local storage mein hai matlab user loggedIn hai.
  public isLoggedIn() {

    let tokenStr = localStorage.getItem("token");

    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    }
    else {

      // if (this.getUserRole() == 'NORMAL') {
      //   this.router.navigate(['/user-dashboard/load-quiz/0']);
      // }
      // if (this.getUserRole() == 'ADMIN') {
      //   this.router.navigate(['/admin-dashboard/profile']);
      // }
      return true;
    }
  }
  // removing token from local storage 
  public logout() {

    localStorage.removeItem("token");
    return true;
  }

  // get token from local storage 
  public getToken() {
    return localStorage.getItem('token');
  }




  // seving user details in local storage
  public setUser(user: any) {

    localStorage.setItem("user", JSON.stringify(user));

  }

  // get user details from local storage

  public getUser() {

    let userStr = localStorage.getItem('user');

    if (userStr != null) {
      return JSON.parse(userStr);
    }
    else {
      this.logout();

      return null;
    }
  }


  // remove user details from local storage

  public removeUserDetails() {
    localStorage.removeItem("user");
    return true;
  }

  // get user roles

  public getUserRole() {

    let user = this.getUser();

    return user.authorities[0].authority;

  }




}
