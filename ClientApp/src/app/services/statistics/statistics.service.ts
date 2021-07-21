import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { OrganizationEmployee } from 'src/app/models/OrganizationEmployee';
import { OrganizationStudent } from 'src/app/models/OrganizationStudents';

@Injectable({
  providedIn: 'root',
})

export class StatisticsService {
  constructor(public http:HttpClient) { }
  baseUrl:string="http://localhost:5000";

  getOrganizationEmployees():Observable<OrganizationEmployee[]>{
    let newUrl = this.baseUrl+'/api/Organizations'
   return this.http.get<OrganizationEmployee[]>(newUrl);
 }
 getOrganizationStudents(id:number):Observable<OrganizationStudent[]>{
  let newUrl = this.baseUrl+'/api/Organizations/'+id
 return this.http.get<OrganizationStudent[]>(newUrl);
}
 searchEmployee(info:OrganizationEmployee):Observable<OrganizationEmployee[]>{
  let newUrl=this.baseUrl+'/api/Organizations/filterOrganizationEmployee';
  return  this.http.post<OrganizationEmployee[]>(newUrl, info,
          {
              headers : new HttpHeaders({"Content-Type": "application/json"})
          });

}
}
