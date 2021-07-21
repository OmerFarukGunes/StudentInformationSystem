import { Component, OnInit } from '@angular/core';
import {  StatisticsService } from 'src/app/services/statistics/statistics.service';
import { OrganizationEmployee } from 'src/app/models/OrganizationEmployee';
import { NgForm } from '@angular/forms';
import { DxChartComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  providers:[ StatisticsService]
})
export class StatisticsComponent implements OnInit {
  organizationEmployee:OrganizationEmployee[] = [];
  selectOrgName:string[]=[];
  selectAppName:string[]=[];
  searchOrgName:OrganizationEmployee[]=[];
  searchAppName:OrganizationEmployee[]=[];
  mySelectForm!: NgForm;
  selectOrganization:OrganizationEmployee = new OrganizationEmployee();
  i:number=1
  j:number=1
  constructor(private organizationEmployeeService:StatisticsService,private router:Router,private authService:AuthService) { }
  customizeTooltip(arg: any) {
    return {
        text: arg.argumentText +' \n'+ arg.seriesName + ' : '+ arg.valueText
    };
}
height = 1000;
width= 4000;
  ngOnInit(): void {
    if (this.authService.authType() != 'Admin')
      this.router.navigate(['/Home']);
    this.organizationEmployeeService.getOrganizationEmployees().subscribe(model=>{this.organizationEmployee=model;
      this.searchOrgName[0]=model[0];
      this.searchAppName[0]=model[0];
      for (let index = 0; index < this.organizationEmployee.length; index++) {
        if (this.searchOrgName.find((test) => test.organizationName === this.organizationEmployee[index].organizationName) === undefined) {
          this.searchOrgName[this.i] = this.organizationEmployee[index];
          this.i++;
        }

        if (this.searchAppName.find((test) => test.appellationName === this.organizationEmployee[index].appellationName) === undefined) {
          this.searchAppName[this.j] = this.organizationEmployee[index];
          this.j++;
        }
      }
    });
  }
  pointClick(e: any) {
    this.router.navigate(['/statisticStudents/'+e.target.data["organizationId"]])
}
  search(){
    this.i=0;
    this.selectOrganization.appellationName='';
    this.selectOrganization.organizationName='';
    if(this.selectAppName.length>0){
      this.selectAppName.forEach(element => {
        this.selectOrganization.appellationName+=element+",";
        this.selectOrganization.id=2;
        this.i++
      });
    }
    if(this.selectOrgName.length>0){
      this.selectOrgName.forEach(element => {
        this.selectOrganization.organizationName+=element+",";
        this.i++
        this.selectOrganization.id=1;
      });
    }
    if(this.selectOrgName.length>0&&this.selectAppName.length>0)
      this.selectOrganization.id=3;
    if(this.selectAppName.length==0 &&this.selectOrgName.length==0){
      this.height=750;
      this.width=3500;
      this.organizationEmployeeService.getOrganizationEmployees().subscribe(model=>{this.organizationEmployee=model;
        this.organizationEmployee.forEach(element => {
          element.color = "red";
        });
      })

    }else{
      this.height=500;
      this.width=1250;
      this.organizationEmployeeService.searchEmployee(this.selectOrganization).subscribe(data=>{
        console.log(data);
        this.organizationEmployee=data;
      } )
    }


  }

}
