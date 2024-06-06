import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login.service";

@Injectable({
  providedIn: 'root'
})
// Admin guard

// note:> agar localstorage mein koi changes(role change ) karke urls ko access kar bhi leta hai , lekin hamari backend api's mein bhi role wali security rahegi. agar db mein uss user ke pass wo role hai to api response degi nahi to unauthorize access error degi.


export class AccessComponentGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) { }
  /**
   * to decide if component route can be activated
   * @param route ActivatedRouteSnapshot
   * @param state RouterStateSnapshot
   * @returns boolean
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("AccessComponentGuard is running ");


    if (this.loginService.isLoggedIn() && this.loginService.getUserRole() == "ADMIN") {
      return true;

    }

    else {
      console.log("user  is not admin ");

      this.router.navigate(['login']);
      return false;
    }
  }
}


@Injectable({
  providedIn: 'root'
})
// Normal guard for normal user
export class NormalGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) { }
  /**
   * to decide if component route can be activated
   * @param route ActivatedRouteSnapshot
   * @param state RouterStateSnapshot
   * @returns boolean
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("AccessComponentGuard is running ");


    if (this.loginService.isLoggedIn() && this.loginService.getUserRole() == "NORMAL") {
      return true;

    }

    else {
      console.log("user  is not Normal user ");

      this.router.navigate(['login']);
      return false;
    }
  }
}