import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Connection } from 'src/app/models/Connection';
import { Student } from 'src/app/models/Student';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify/alertify.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConnectionService } from 'src/app/services/connection/connection.service';
import { ParentService } from 'src/app/services/parent/parent.service';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-add-student-form',
  templateUrl: './add-student-form.component.html',
  styleUrls: ['./add-student-form.component.css'],
})
export class AddStudentFormComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private authService: AuthService,
    private studentService: StudentService,
    private connectionService: ConnectionService,
    private alertifyService: AlertifyService
  ) {}
  id!: number;
  student: Student = new Student();
  connect: Connection = new Connection();
  user: User = new User();
  ngOnInit(): void {
    if (this.authService.authType() != 'Admin') this.router.navigate(['/Home']);
    this.id = this.route.snapshot.params['id'];
    this.connectionService
      .getConnectionByFamilyId(this.id)
      .subscribe((data) => {
        this.connect.parentId = data[0].parentId;
      });
  }
  add() {
    this.user.userName = this.user.email;
    this.user.role = 'Student';
    this.connect.parentId = this.id;
    this.authService.register(this.user).subscribe(
      (usr) => {
        this.student.loginId = usr.id;
        this.studentService.addStudent(this.student).subscribe(
          (std) => {
            this.connect.studentId = std.studentId;
            this.connectionService.addConnection(this.connect).subscribe(
              () => {
                this.alertifyService.success('Kayıt Oluşturuldu');
                this.router.navigate(['/SchoolDetail/',std.studentId])
              },
              (error) => {
                this.alertifyService.error(
                  'Bağlantı Tablosu Oluşturulurken Hata Oluştu'
                );
              }
            );
          },
          (error) => {
            this.alertifyService.error('Öğrenci Eklenirken Hata Oluştu');
          }
        );
      },
      (error) => {
        this.alertifyService.error('Öğrenci Kullanıcısı Eklenirken Hata Oluşt');
      }
    );
  }
}
