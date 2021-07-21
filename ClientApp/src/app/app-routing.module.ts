import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DxChartModule } from 'devextreme-angular';
import { AddAdminComponent } from './Views/add-admin/add-admin.component';
import { AddStudentFormComponent } from './Views/add-student-form/add-student-form.component';
import { ListParentsComponent } from './Views/list-parents/list-parents.component';
import { ListStudentComponent } from './Views/list-student/list-student.component';
import { LoginComponent } from './Views/login/login.component';
import { ParentDetailsComponent } from './Views/parent-details/parent-details.component';
import { SchoolPaymentComponent } from './Views/SchoolPayment/school-payment/school-payment.component';
import { StatisticsOfStudentsComponent } from './Views/statistics-of-students/statistics-of-students.component';
import { StatisticsComponent } from './Views/statistics/statistics.component';
import { StudentDetailsComponent } from './Views/student-details/student-details.component';
import { StudentFamilyFormComponent } from './Views/student-family-form/student-family-form.component';

const routes: Routes = [
  {path:'AddForm',component:StudentFamilyFormComponent},
  {path:'AddAdmin',component:AddAdminComponent},
  {path:'List',component:ListStudentComponent},
  {path:'FamilyList',component:ListParentsComponent},
  {path:'StudentDetail/:id',component:StudentDetailsComponent},
  {path:'ParentDetail/:id',component:ParentDetailsComponent},
  {path: 'AddForm/:id', component: StudentFamilyFormComponent },
  {path: 'AddStudent/:id', component: AddStudentFormComponent },
  {path: 'Home', component: LoginComponent },
  {path: 'SchoolDetail', component: SchoolPaymentComponent },
  {path: 'SchoolDetail/:id', component: SchoolPaymentComponent },
  {path:'',redirectTo:'Home',pathMatch:'full'},
  {path:'statisticEmployee', component: StatisticsComponent},
  {path:'statisticStudents/:id', component: StatisticsOfStudentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),DxChartModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
