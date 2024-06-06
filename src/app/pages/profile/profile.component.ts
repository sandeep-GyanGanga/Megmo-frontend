import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  public user: any = null;
  constructor(public loginService: LoginService, private location: Location) {

    this.user = loginService.getUser();
  }

  backToPreviousRoute() {
    this.location.back();
  }

}
