import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiCommonService } from 'src/app/services/api-common.service';
import Swal from 'sweetalert2';
import { DatePipe, Location } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {


  allCategories: any = [];
  isChecked = true;
  addtaskForm!: FormGroup;
  categoryId: any;
  pageTitle: any = '';
  allStatus: any = [{ value: 'Pending', viewValue: "Pending" }, { value: 'In-Progress', viewValue: "In-Progress" }, { value: 'Completed', viewValue: "Completed" }]
  userDetails: any;
  taskDetails: any;

  constructor(private apiCommonService: ApiCommonService, private location: Location, private snack: MatSnackBar, private router: Router, private _fb: FormBuilder, public loginService: LoginService, private datepipe: DatePipe) {

    if (this.router.getCurrentNavigation()?.extras.state != undefined) {
      let state: any;
      state = this.router.getCurrentNavigation()?.extras.state;
      if (state.action == 'Edit Task') {
        this.pageTitle = state.action;
        this.taskDetails = state.task;
        this.setValueInForm();
      }


    } else {
      this.pageTitle = 'Add New Task'
      this.addtaskForm = this._fb.group({
        taskId: [null,],
        title: [null, Validators.required],
        description: [null, Validators.required],
        taskStatus: [null, Validators.required],
        taskDueDate: [null, [Validators.required]],
        userId: [null]
      });
    }



  }

  setValueInForm() {
    this.addtaskForm = this._fb.group({
      taskId: [this.taskDetails.id,],
      title: [this.taskDetails.taskTitle, Validators.required],
      description: [this.taskDetails.taskDescription, Validators.required],
      taskStatus: [this.taskDetails.taskStatus, Validators.required],
      taskDueDate: [new Date(this.taskDetails.taskDueDate), [Validators.required]],
      userId: [this.taskDetails.user.id]
    });
  }



  backToPreviousRoute() {
    this.location.back();
  }


  addTask() {
    if (this.addtaskForm.valid) {
      this.userDetails = this.loginService.getUser();
      let body = {
        "id": this.addtaskForm.controls['taskId'].value,
        "taskTitle": this.addtaskForm.controls['title'].value,
        "taskDescription": this.addtaskForm.controls['description'].value,
        "taskStatus": this.addtaskForm.controls['taskStatus'].value,
        "taskDueDate": this.datepipe.transform(this.addtaskForm.controls['taskDueDate'].value, "YYYY-MM-dd"),
        "user": {
          "id": this.userDetails.id
        }

      }

      this.apiCommonService.post('/tasks/add-new-task', body).subscribe((res: any) => {
        Swal.fire('Success', 'Task added successfully', 'success');
        this.router.navigate(['/task-table']);
      },
        (Error) => {
          Swal.fire('Error', 'Something went wrong', 'error');
        })
    }
  }

  updateTask() {
    if (this.addtaskForm.valid) {
      let body = {
        "id": this.addtaskForm.controls['taskId'].value,
        "taskTitle": this.addtaskForm.controls['title'].value,
        "taskDescription": this.addtaskForm.controls['description'].value,
        "taskStatus": this.addtaskForm.controls['taskStatus'].value,
        "taskDueDate": this.datepipe.transform(this.addtaskForm.controls['taskDueDate'].value, "YYYY-MM-dd"),
        "user": {
          "id": this.addtaskForm.controls['userId'].value
        }

      }

      this.apiCommonService.put('/tasks/edit-task', body).subscribe((res: any) => {
        Swal.fire('Success', 'Task updated successfully', 'success');
        this.router.navigate(['/task-table']);
      },
        (Error) => {
          Swal.fire('Error', 'Something went wrong', 'error');
        })
    }
  }

  getQuizeDetails(qId: any) {

    this.apiCommonService.get('/quiz/' + qId).subscribe((res: any) => {
      console.log("res of get quiz is ", res);
      this.addtaskForm.controls['qId'].setValue(res.qId);
      this.addtaskForm.controls['title'].setValue(res.title);
      this.addtaskForm.controls['description'].setValue(res.decription);
      this.addtaskForm.controls['maxMarks'].setValue(res.maxMarks);
      this.addtaskForm.controls['numberOfQuestions'].setValue(res.numberOfQuestions);
      this.addtaskForm.controls['cid'].setValue(res.category.cid);
      this.addtaskForm.controls['active'].setValue(res.active)

    })
  }


}
