import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Connection } from 'src/app/models/Connection';
import { Student } from 'src/app/models/Student';
import { AlertifyService } from 'src/app/services/alertify/alertify.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConnectionService } from 'src/app/services/connection/connection.service';
import { ParentService } from 'src/app/services/parent/parent.service';
import { StudentService } from 'src/app/services/student/student.service';
@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    public authService:AuthService
  ) {}
  id!: number;
  student: Student = new Student();
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.studentService.getStudentByLoginId(this.id).subscribe((std) => {
      this.student = std;
    });
  }
}
