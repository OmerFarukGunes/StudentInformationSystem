import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Connection } from 'src/app/models/Connection';
import { Parent } from 'src/app/models/Parent';
import { Student } from 'src/app/models/Student';
import { AlertifyService } from 'src/app/services/alertify/alertify.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConnectionService } from 'src/app/services/connection/connection.service';
import { ParentService } from 'src/app/services/parent/parent.service';
import { StudentService } from 'src/app/services/student/student.service';
@Component({
  selector: 'app-parent-details',
  templateUrl: './parent-details.component.html',
  styleUrls: ['./parent-details.component.css']
})
export class ParentDetailsComponent implements OnInit {


  constructor(private route: ActivatedRoute,private parentService:ParentService,private studentService:StudentService,private connectionService:ConnectionService,public authService:AuthService) { }
  id!:number;
  parent:Parent = new Parent();
  students:Student[]=[];
  ids:number[]=[];
  ngOnInit(): void {
    if(this.authService.loggedIn()&&this.authService.authType()!="Student"){

    this.id = this.route.snapshot.params['id'];
      this.parentService.getParentByLoginId(this.id).subscribe(std=>{this.parent= std;
        this.connectionService.getConnectionByFamilyId(std.parentId).subscribe(data=>{
          for (let index = 0; index < data.length; index++) {
          this.ids[index]=data[index].studentId;
          this.studentService.getStudentById(this.ids[index]).subscribe((model)=>this.students[index]=model);
          }
        });
      });
    }

  }


}
