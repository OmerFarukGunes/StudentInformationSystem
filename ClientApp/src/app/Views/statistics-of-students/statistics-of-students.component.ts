import { Component, OnInit } from '@angular/core';
import {  StatisticsService } from 'src/app/services/statistics/statistics.service';
import { OrganizationStudent } from 'src/app/models/OrganizationStudents';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-statistics-of-students',
  templateUrl: './statistics-of-students.component.html',
  styleUrls: ['./statistics-of-students.component.css']
})
export class StatisticsOfStudentsComponent implements OnInit {
  organizationStudent:OrganizationStudent[] = [];
  constructor(private organizationEmployeeService:StatisticsService,private route: ActivatedRoute,private router:Router,private authService:AuthService) { }

  id=0;
  ngOnInit(): void {

    if (this.authService.authType() != 'Admin')
      this.router.navigate(['/Home']);
    this.id = this.route.snapshot.params['id'];
    this.organizationEmployeeService.getOrganizationStudents(this.id).subscribe(model=>{this.organizationStudent=model;

    }
    );
  }


}
