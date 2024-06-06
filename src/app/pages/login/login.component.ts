import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCommonService } from 'src/app/services/api-common.service';
import { LoginService } from 'src/app/services/login.service';
import { NotificationService } from 'src/app/services/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private apicommonService: ApiCommonService, private router: Router, private notification: NotificationService, private loginService: LoginService) {

  }
  public loginData: any = {
    'username': '',
    'password': ''
  }

  formSubmit() {
    let token: any;
    console.log('calling', this.loginData);
    if (this.loginData.username.trim() == '' || this.loginData.password.trim() == '') {
      // this.notification.showError('Username or Password should not be blank');
      Swal.fire('Error', 'Username and password should not be blank!', 'error');


      return;
    }

    this.loginService.generateToken('/generate-token', this.loginData).subscribe((res: any) => {

      console.log("generated token is ", res);

      token = res.token;


    },
      (err: any) => {
        this.notification.showError('Username or Password is wrong');

      },
      () => {

        this.loginService.loginUser(token);

        this.loginService.getCurrentUser().subscribe((user: any) => {

          console.log("getCurrentUser res is ", user);

          this.loginService.setUser(user);
          this.loginService.loginStatusSubject.next(true);



          if (this.loginService.getUserRole() == "NORMAL") {

            // window.location.href = '/user-dashboard';
            this.router.navigate(['task-table']);


          }

          else {
            this.loginService.logout();
          }
        });


      })

  }



}
