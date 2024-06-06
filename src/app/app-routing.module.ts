import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AccessComponentGuard, NormalGuard } from './services/admin.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { TaskTableComponent } from './pages/task-table/task-table.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';

const routes: Routes = [

  { path: 'sign-up', component: SignUpComponent, pathMatch: 'full' },

  { path: 'login', component: LoginComponent, pathMatch: 'full' },

  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'task-table', component: TaskTableComponent, pathMatch: 'full' },
  { path: 'add-task', component: AddTaskComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
