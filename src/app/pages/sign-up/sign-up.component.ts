import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCommonService } from 'src/app/services/api-common.service';
import { NotificationService } from 'src/app/services/notification.service';
import Swal from 'sweetalert2';

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

  addUser!: FormGroup;


  constructor(private apicommonService: ApiCommonService, private notification: NotificationService, private router: Router, private _fb: FormBuilder) {

    this.addUser = this._fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      phone: [null, [Validators.required]],
      email: [null, Validators.required]
    });


  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  formSubmit() {
    if (this.addUser.valid) {

      this.apicommonService.post('/users/', this.addUser.value).subscribe((res: any) => {

      }, (err: any) => {
        // this.notification.showError('Something went wrong');

      },
        () => {
          Swal.fire('Success', 'You have Register Successfully', 'success');

          this.router.navigate(['/login']);

        })

    }
    else {
      Swal.fire('Error', 'Form is Invalid!', 'error');

    }


  }

  resetForm() {
    this.User = {
      'username': '',
      'password': '',
      "firstname": '',
      "lastname": '',
      "phone": '',
      "email": ''
    };
  }

}
