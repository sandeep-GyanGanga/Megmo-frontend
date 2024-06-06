import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErroInterceptorService } from './services/erro-interceptor.service';
import { LoaderInterceptorService } from './services/loader-interceptor.service';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { ToastModule } from "primeng/toast";
import { LoginComponent } from './pages/login/login.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MatCardModule } from '@angular/material/card'
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProfileComponent } from './pages/profile/profile.component';
import { MatListModule } from '@angular/material/list';

import { DialogModule } from 'primeng/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { TaskTableComponent } from './pages/task-table/task-table.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignUpComponent,
    LoginComponent,
    HomePageComponent,
    ProfileComponent,
    TaskTableComponent,
    AddTaskComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, MatProgressSpinnerModule, MatButtonModule, ReactiveFormsModule, MatSelectModule, MatSlideToggleModule, MatCardModule, MatSnackBarModule, DialogModule, MatListModule, ToastModule, HttpClientModule, MatToolbarModule, MatDividerModule, MatIconModule, MatInputModule, MatFormFieldModule, FormsModule, NgxUiLoaderModule, MatTableModule, MatDatepickerModule, MatNativeDateModule,
  ],
  providers: [MessageService, DatePipe,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErroInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
