import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCommonService } from 'src/app/services/api-common.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent {

  dataSource: any = [{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },];
  displayedColumns: string[] = ['index', 'taskTitle', 'taskDescription', 'taskDueDate', 'taskStatus', 'actions'];

  totalPages: any;
  currentPageIndex: number = 0;
  userDetails: any;

  constructor(private apicommonService: ApiCommonService, public loginService: LoginService, private router: Router) {
    this.userDetails = loginService.getUser();
    console.log(this.userDetails);
    this.getAllTask(this.currentPageIndex);

  }


  getAllTask(pageIndex: number) {
    let userid = this.userDetails.id;
    this.currentPageIndex = pageIndex;
    this.dataSource = [];

    this.apicommonService.get('/tasks/get-all-tasks/' + userid + '/' + pageIndex).subscribe(

      (res: any) => {
        this.dataSource = res.data;
        this.totalPages = res.total_pages
      },
      (Error) => { },

      () => {
        let i = 0;
        this.dataSource.forEach((element: any) => {
          i = i + 1;
          element.index = i;
        });

        console.log("data source ", this.dataSource);

      }
    )
  }

  editTask(task: any) {
    this.router.navigate(['/add-task'], { state: { action: 'Edit Task', task: task } });

  }

  deleteTask(task: any) {
    let answer: any;

    answer = confirm("Are you sure you want to delete " + task.taskTitle + " Task")

    if (answer) {
      this.apicommonService.delete('/tasks/delete-task/' + task.id).subscribe((res: any) => {

        Swal.fire('Success', res.message, 'success');
        this.getAllTask(0);

      })
    }


  }


}
