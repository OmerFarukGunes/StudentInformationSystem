import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/Student';
import { AlertifyService } from 'src/app/services/alertify/alertify.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConnectionService } from 'src/app/services/connection/connection.service';
import { StudentService } from 'src/app/services/student/student.service';
@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css'],
})
export class ListStudentComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private studentService: StudentService,
    private connectionService: ConnectionService,
    private alertifyService: AlertifyService
  ) {}
  students?: Student[];
  info:Student=new Student;
  ngOnInit(): void {
    if(this.authService.authType()!='Admin')
      this.router.navigate(['/Home']);
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  onDelete(id: number) {
    this.studentService.deleteStudent(id).subscribe((data) => {
      this.connectionService.getConnectionByStudentId(id).subscribe(model => {
        this.connectionService.deleteConnection(model).subscribe(()=>{
          this.studentService.getStudents().subscribe((data) => {
            this.students = data;
          });
        })
      });
    });
  }
  search(){
    this.studentService.searchStudent(this.info).subscribe(data=>{
      console.log(data);
      this.students=data;
    },error=>{
      this.alertifyService.error("Kayıt Bulunamadı");
    })
  }
}
