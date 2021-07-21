import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Connection } from 'src/app/models/Connection';
import { Parent } from 'src/app/models/Parent';
import { Student } from 'src/app/models/Student';
import { AlertifyService } from 'src/app/services/alertify/alertify.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConnectionService } from 'src/app/services/connection/connection.service';
import { ParentService } from 'src/app/services/parent/parent.service';
import { StudentService } from 'src/app/services/student/student.service';
@Component({
  selector: 'app-list-parents',
  templateUrl: './list-parents.component.html',
  styleUrls: ['./list-parents.component.css'],
})
export class ListParentsComponent implements OnInit {
  constructor(
    private router: Router,
    private parentService: ParentService,
    private connectionService: ConnectionService,
    private authService:AuthService,
    private alertifyService: AlertifyService
  ) {}
  parents?: Parent[];
  info:Parent=new Parent();
  ngOnInit(): void {
    if (this.authService.authType() != 'Admin')
       this.router.navigate(['/Home']);
    this.parentService.getParents().subscribe((data) => {
      this.parents = data;
    });
  }

  onDelete(id: number) {
    this.parentService.deleteParent(id).subscribe((data) => {
      this.connectionService.getConnectionByFamilyId(id).subscribe(model => {
        this.connectionService.deleteConnection(model[0]).subscribe(()=>{
          this.parentService.getParents().subscribe((data) => {
            this.parents = data;
          });
        })
      });
    });
  }
  search(){
    this.parentService.searchParent(this.info).subscribe(data=>{
      console.log(data);
      this.parents=data;
    },error=>{
      this.alertifyService.error("Kayıt Bulunamadı");
    })
  }
}
