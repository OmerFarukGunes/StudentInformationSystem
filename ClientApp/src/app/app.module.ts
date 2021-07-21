import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Views/login/login.component';
import { ListStudentComponent } from './Views/list-student/list-student.component';
import { ListParentsComponent } from './Views/list-parents/list-parents.component';
import { ParentDetailsComponent } from './Views/parent-details/parent-details.component';
import { StudentDetailsComponent } from './Views/student-details/student-details.component';
import { AddStudentFormComponent } from './Views/add-student-form/add-student-form.component';
import { StudentFamilyFormComponent } from './Views/student-family-form/student-family-form.component';
import { StudentService } from './services/student/student.service';
import { ParentService } from './services/parent/parent.service';
import { SchoolInfoService } from './services/schoolInfo/school-info.service';
import { AlertifyService } from './services/alertify/alertify.service';
import { PaymentService } from './services/payment/payment.service';
import { ConnectionService } from './services/connection/connection.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './Views/navbar/navbar.component';
import { SchoolPaymentComponent } from './Views/SchoolPayment/school-payment/school-payment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddAdminComponent } from './Views/add-admin/add-admin.component';
import { StatisticsComponent } from './Views/statistics/statistics.component';
import { DxButtonModule, DxChartModule, DxPieChartModule, DxSelectBoxModule } from 'devextreme-angular';
import { DxiSeriesModule, DxiValueAxisModule, DxoArgumentAxisModule, DxoLabelModule } from 'devextreme-angular/ui/nested';

import { NgSelectModule } from '@ng-select/ng-select';
import { StatisticsOfStudentsComponent } from './Views/statistics-of-students/statistics-of-students.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListStudentComponent,
    ListParentsComponent,
    ParentDetailsComponent,
    StudentDetailsComponent,
    AddStudentFormComponent,
    StudentFamilyFormComponent,
    NavbarComponent,
    SchoolPaymentComponent,
    AddAdminComponent,
    StatisticsComponent,
    StatisticsOfStudentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    DxChartModule,
    DxButtonModule,
    DxChartModule,
    DxoLabelModule,
    DxiSeriesModule,
    DxoArgumentAxisModule,
    DxiValueAxisModule,
    NgSelectModule,
    DxPieChartModule,
    DxSelectBoxModule
  ],
  providers: [StudentService,ParentService,SchoolInfoService,AlertifyService,PaymentService,ConnectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
