import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCommonService } from 'src/app/services/api-common.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public User: any = {
    'username': '',
    'password': '',
    "firstname": '',
    "lastname": '',
    "phone": '',
    "email": ''

  }

  constructor(private apicommonService: ApiCommonService, private notification: NotificationService, private router: Router) {


  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  formSubmit() {
    if (this.User.username == '' || this.User.username == null) {
      // alert('User is required!!')
      return;
    }
    this.apicommonService.post('/users/', this.User).subscribe((res: any) => {

    }, (err: any) => {
      // this.notification.showError('Something went wrong');

    },
      () => {
        this.notification.showSuccess('you Have Registered Successfully');
        this.router.navigate(['/login']);

      })



  }

}
