import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  username: any = '';

  constructor(public loginService: LoginService, private router: Router) {

    loginService.loginStatusSubject.subscribe((res: boolean) => {
      if (res == true) {

        this.username = loginService.getUser();

      }
    })

    if (loginService.isLoggedIn()) {

      this.username = loginService.getUser();
      this.router.navigate(['task-table']);

    }

  }

  public logout() {

    this.loginService.logout();

    this.loginService.removeUserDetails();

    this.router.navigate(['/login']);
    // window.location.reload();
  }

}
