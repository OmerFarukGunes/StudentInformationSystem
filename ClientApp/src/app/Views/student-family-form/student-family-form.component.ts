import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Connection } from 'src/app/models/Connection';
import { Parent } from 'src/app/models/Parent';
import { Student } from 'src/app/models/Student';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify/alertify.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConnectionService } from 'src/app/services/connection/connection.service';
import { ParentService } from 'src/app/services/parent/parent.service';
import { StudentService } from 'src/app/services/student/student.service';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-student-family-form',
  templateUrl: './student-family-form.component.html',
  styleUrls: ['./student-family-form.component.css'],
})
export class StudentFamilyFormComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private parentService: ParentService,
    private studentService: StudentService,
    private connectionService: ConnectionService,
    private alertifyService: AlertifyService,
    private userService: UserService,
    private router:Router
  ) {}
  student: Student = new Student();
  parent: Parent = new Parent();
  connect: Connection = new Connection();
  isAddMode!: boolean;
  id!: number;
  form!: NgForm;
  studentUser: User = new User();
  parentUser: User = new User();
  ngOnInit(): void {
    if (this.authService.authType() != 'Admin')
      this.router.navigate(['/Home']);
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.student.paymentId = 0;
    this.student.schoolInfoId = 0;
    if (!this.isAddMode) {
      this.studentService.getStudentById(this.id).subscribe((std) => {
        this.student = std;
        this.connectionService
          .getConnectionByStudentId(this.id)
          .subscribe((cStd) => {
            this.parentService.getParentById(cStd.parentId).subscribe((fml) => {
              this.parent = fml;
              this.userService.getUserById(std.loginId).subscribe((stdUser) => {
                this.studentUser = stdUser;
                this.userService
                  .getUserById(fml.loginId)
                  .subscribe((fmlUser) => {
                    this.parentUser = fmlUser;
                  });
              });
            });
          });
      });
    }
  }
  onSubmit() {
    if (this.isAddMode) {
      this.add();
    } else {
      this.update();
    }
  }
  add() {
    this.studentUser.role = 'Student';
    this.parentUser.role = 'Parent';
    this.parentUser.userName = this.parentUser.email;
    this.studentUser.userName = this.studentUser.email;
    this.authService.register(this.studentUser).subscribe(
      (usr) => {
        this.student.loginId = usr.id;
        this.authService.register(this.parentUser).subscribe(
          (prt) => {
            this.parent.loginId = prt.id;
            this.studentService.addStudent(this.student).subscribe(
              (std) => {
                this.connect.studentId = std.studentId;
                this.parentService.addParent(this.parent).subscribe(
                  (fml) => {
                    this.connect.parentId = fml.parentId;
                    this.connectionService
                      .addConnection(this.connect)
                      .subscribe(
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
                    this.alertifyService.error('Veli Eklenirken Hata Oluştu');
                  }
                );
              },
              (error) => {
                this.alertifyService.error('Öğrenci Eklenirken Hata Oluştu');
              }
            );
          },
          (error) => {
            this.alertifyService.error(
              'Veli Kullanıcısı Eklenirken Hata Oluştu'
            );
          }
        );
      },
      (error) => {
        this.alertifyService.error(
          'Öğrenci Kullanıcısı Eklenirken Hata Oluştu'
        );
      }
    );
  }

  update() {
    this.studentService.updateStudent(this.student);
    this.parentService.updateParent(this.parent);
  }
}
