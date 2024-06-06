import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ApiCommonService } from './services/api-common.service';
import { LoginService } from './services/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'Exam-server-frontend';



  constructor(private router: Router, private apicommonService: ApiCommonService, public loginService: LoginService) {

    if (loginService.isLoggedIn()) {
      this.router.navigate(['/task-table']);
    }

  }


}

// 